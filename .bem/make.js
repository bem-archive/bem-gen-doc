/*global MAKE:true */

var PATH = require('path'),
    LOGGER = require('bem/lib/logger'),

    environ = require('./environ'),

    siteNodes = require('./nodes/site'),
    examplesNodes = require('./nodes/examples'),

    SITE_NODE_ID = 'site';

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    getLibraries : function() {

        /**
         * Псевдо-репозиторий известных библиотек
         */
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
            /**
             * Список библиотек которые нужно подключить в проект
             */
            libs = ['bem-bl', 'bem-html', 'bem-json'],
            /** @type Function */
            getLibRelPath = environ.getLibRelPath;

        // возвращаем список необходимых библиотек
        return libs.reduce(function(enabled, lib) {

            repo[lib] && (enabled[getLibRelPath(lib)] = repo[lib]);
            return enabled;

        }, {});

    },

    createCustomNodes : function(common, libs, blocks, bundles) {

        var levels = ['common.blocks', 'desktop.blocks', 'test.blocks'];

        var node = new siteNodes.SiteNode({
            id : SITE_NODE_ID,
            arch : this.arch,
            levels : levels
        });

        this.arch.setNode(node);

        return node.alterArch();

    }

});
