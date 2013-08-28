'use strict';

var PATH = require('path'),
    environ = require('bem-environ');

module.exports = function(registry) {

    registry.decl('MachineBundleNode', 'BundleNode', {

        getTechs : function() {

            return [
                'bemdecl.js',
                'deps.js',
                'bemjson.js',
                'bemhtml',
                'css',
                'js'
            ];

        },

        getLevels : function(tech) {

            var bemblLevels = ['blocks-common', 'blocks-desktop']
                    .map(function(level) {
                        return environ.getLibPath('bem-bl', level);
                    }),
                siteLevels = ['common.blocks', 'site.blocks']
                    .map(function(level) {
                        return PATH.join(environ.PRJ_ROOT, level);
                    });

            return bemblLevels.concat(siteLevels);

        },

        'create-bemjson.js-node' : function(tech, bundleNode, magicNode) {
            return this.createDefaultTechNode.apply(this, arguments);
        },

        /*
        'create-meta.tree-node' : function(tech, bundleNode, magicNode) {
            return return this.setBemBuildNode(
                    tech,
                    this.level.resolveTech(tech),
                    this.getBundlePath('deps..js'),
                    bundleNode,
                    magicNode);
        },
        */

        'create-bemjson.js-optimizer-node' : function() {
            return this['create-js-optimizer-node'].apply(this, arguments);
        }

    });

};
