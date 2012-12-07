/*global MAKE:true */

var PATH = require('path'),
    LOGGER = require('bem/lib/logger'),

    siteNodes = require('./nodes/site'),

    /** {String} директория, куда складываем библиотеки */
    LIB_ROOT = 'lib',

    SITE_NODE_ID = 'site';

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    getLibraries : function() {

        /** Псевдо-репозиторий известных библиотек */
        var repo = {
                'bem-bl' : {
                    type        : 'git',
                    url         : 'git://github.com/bem/bem-bl.git',
                    treeish     : '0.3'
                },
                'bem-html' : {
                    type        : 'git',
                    url         : 'git://github.com/bem/bemhtml.git'
                },
                'bem-json' : {
                    type        : 'git',
                    url         : 'git://github.com/delfrrr/bem-json.git',
                    npmPackages : false
                }
            },
            /** какие библиотеки подключать на проект */
            libs = ['bem-bl', 'bem-html', 'bem-json'],
            /** {Function} */
            join = PATH.join;

        // возвращаем список необходимых библиотек
        return libs.reduce(function(enabled, lib) {

            repo[lib] && (enabled[join(LIB_ROOT, lib)] = repo[lib]);
            return enabled;

        }, {});

    },

    createCustomNodes : function(common, libs, blocks, bundles) {

        var node = new siteNodes.SiteNode({
            id : SITE_NODE_ID,
            arch : this.arch
        });

        this.arch.setNode(node);

        return node.alterArch();

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

