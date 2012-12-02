/*global MAKE:true */

"use strict";

var PATH = require('path'),
    LOGGER = require('bem/lib/logger'),
    introspectNodes = require('./nodes/introspect'),

    EXPORT_LEVELS = ['common.blocks', 'desktop.blocks', 'test.blocks'],

    SITE_NODE_ID = 'site',
    SITE_BUNDLES = 'site',
    SITE_SETS = {
        'desktop.blocks' : {
            'examples' : [
                'bem-bl/blocks-common',
                'bem-bl/blocks-desktop',
                'desktop.blocks'
            ]
        }
    },

    BEM_I18N_LANGS = ['ru'];


MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    getLibraries : function() {

        return {
            'lib/bem-bl' : {
                type        : 'git',
                url         : 'git://github.com/bem/bem-bl.git',
                treeish     : '0.3'
            },
            'lib/bem-html' : {
                type        : 'git',
                url         : 'git://github.com/bem/bemhtml.git'
            },
            'lib/bem-json' : {
                type        : 'git',
                url         : 'git://github.com/delfrrr/bem-json.git',
                npmPackages : false
            }
        };

    },

    createCustomNodes : function(common, libs, blocks, bundles) {

        var node = new (MAKE.getNodeClass('SiteNode'))({
            id : SITE_NODE_ID,
            root : this.root,
            arch : this.arch
        });

        // XXX: unhardcodeme
        this.arch.setNode(node).addParents('site.bundles*', node);

        return node.alterArch();
    }

});


MAKE.decl('SiteNode', 'Node', {

    __constructor : function(o) {

        this.__base.apply(this, arguments);

        this.root = o.root;
        this.arch = o.arch;

    },

    alterArch : function() {

        var site = new introspectNodes.IntrospectNode({
                id : SITE_NODE_ID + '*',
                root : this.root,
                exportLevels : EXPORT_LEVELS,
                siteBundleName : SITE_BUNDLES,
                sets : SITE_SETS,
                langs : BEM_I18N_LANGS
            }),
            arch = this.arch;

        arch.setNode(site, this.getId());

        return site.getId();

    }

}, {

    createId : function(o) {
        return o.id;
    }

});


MAKE.decl('BundleNode', {

    getTechs : function() {

        return [
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'bemtree.js',
            'css',
            'js'
        ];

    },

    getLevels : function() {

        return [
                'lib/bem-html/common.blocks',
                'common.blocks',
                'site.blocks'
            ].map(function(path) {
                return PATH.resolve(this.root, path);
            }, this);

    },

    'create-bemtree.js-node' : function(tech, bundleNode, magicNode) {
        return this.createDefaultTechNode.apply(this, arguments);
    },

    'create-bemtree.js-optimizer-node' : function() {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});

