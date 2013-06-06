/*global MAKE:true */

require('../../.bem/nodes/arch');

try {
    require('../../.bem/nodes');
} catch(e) {
    // FIXME: first-run problem
}

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
