/*global MAKE:true */

"use strict";

var PATH = require('path'),
    introspectNodes = require('./nodes/introspect'),

    EXPORT_LEVELS = ['common', 'desktop', 'test'],

    SITE_NODE_ID = 'site',
    SITE_BUNDLES = 'site',

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

        var site = new introspectNodes.IntrospectNode({
                id : SITE_NODE_ID,
                root : this.root,
                exportLevels : EXPORT_LEVELS,
                siteBundleName : SITE_BUNDLES,
                langs : BEM_I18N_LANGS
            });

        // XXX: unhardcodeme
        this.arch.setNode(site).addParents('site.bundles*', site);

        return site.getId();

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

