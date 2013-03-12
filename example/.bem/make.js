/*global MAKE:true */

require('../../.bem/nodes/arch');

var PATH = require('path'),
    environ = require('../../.bem/environ'),
    siteNodes = require('../../.bem/nodes/site');

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : ['bem-bl', 'bem-json', 'bem-pr'],

    createCustomNodes : function(common, libs) {

        /**
         * A set of levels to build site from
         * @type Array
         */
        var levels = ['../common.blocks', 'desktop.blocks', 'test.blocks'];

        return new siteNodes.SiteNode({
                id   : 'site',
                arch : this.arch,
                root : this.root,
                levels : levels
            })
            .alterArch(null, libs);

    }

});


MAKE.decl('ExampleNode', {

    getTechs : function() {
        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'css',
            'js',
            'html'
            ];
    },

    getLevels : function() {
        return [
                'blocks-common',
                'blocks-desktop'
            ].map(environ.getLibPath.bind(null, 'bem-bl'))
            .concat([
                '../common.blocks',
                'desktop.blocks',
                'test.blocks',
                this.rootLevel.getTech('blocks').getPath(this.getSourceNodePrefix())
            ].map(PATH.resolve.bind(null, this.root)));
    }

});
