/*global MAKE:true */

require('bem-environ/lib/nodes/arch');

try {
    require('../../.bem/nodes');
} catch(e) {
    require('bem/lib/logger').error(e? e.stack || e : '');
}

var PATH = require('path'),
    environ = require('bem-environ');

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : ['bem-bl', 'bem-json', 'bem-pr @ 0.1.0']

});


MAKE.decl('GenDocNode', {

    outputName : 'release',

    getSources : function() {
        return ['../common.blocks', 'desktop.blocks', 'test.blocks'];
    }

});


MAKE.decl('SetsLevelNode', {

    getSourceItemTechs : function() {
        return ['examples'];
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
        var levels = ['blocks-common', 'blocks-desktop'].map(function(level) {
                return environ.getLibPath('bem-bl', level);
            }),
            resolve = PATH.resolve.bind(null, this.root);

        levels.concat([
            '../common.blocks',
            'desktop.blocks',
            'test.blocks',
            this.rootLevel.getTech('blocks').getPath(this.getSourceNodePrefix())
        ].map(function(level) {
            return resolve(level);
        }));

        return levels;
    }

});
