/*global MAKE:true */

'use strict';

var PATH = require('path'),
    environ = require('bem-environ')(__dirname),
    genDoc = require('../..');

(function(registry) {

    environ.extendMake(registry);
    genDoc.extendMake(registry);

    registry.decl('Arch', {
        blocksLevelsRegexp : /^.+?\.blocks$/,
        bundlesLevelsRegexp : /^.+?\.bundles$/,
        libraries : [ 'bem-bl @ 0.3', 'bem-json' ]
    });

    registry.decl('GenDocNode', {

        outputName : 'release',

        getSources : function() {
            return [
                '../common.blocks',
                'desktop.blocks',
                'test.blocks'
            ];
        }

    });

    registry.decl('SetsLevelNode', {

        getSourceItemTechs : function() {
            return ['examples'];
        }

    });

    registry.decl('ExampleNode', {

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
            var levels = ['blocks-common', 'blocks-desktop']
                    .map(function(level) {
                        return environ.getLibPath('bem-bl', level);
                    }),
                resolve = PATH.resolve.bind(null, this.root);

            levels.concat([
                    '../common.blocks',
                    'desktop.blocks',
                    'test.blocks',
                    this.rootLevel.getTech('blocks').getPath(this.getSourceNodePrefix())
                ]
                .map(function(level) {
                    return resolve(level);
                }));

            return levels;
        }

    });

})(MAKE);
