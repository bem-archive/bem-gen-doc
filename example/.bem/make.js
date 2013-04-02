/*global MAKE:true */

require('../../.bem/nodes/arch');
require('../../.bem/nodes');

var PATH = require('path'),
    environ = require('../../.bem/environ');

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : ['bem-bl', 'bem-json', 'bem-pr']

});


MAKE.decl('GenDocNode', {

    getSources : function() {
        return ['../common.blocks', 'desktop.blocks', 'test.blocks'];
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
