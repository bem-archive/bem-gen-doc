/**
 * @module nodes/bundle
 */

var PATH = require('path'),
    BEM = require('bem'),
    registry = require('bem/lib/nodesregistry'),
    BundleNode = require('bem/lib/nodes/bundle').BundleNode,

    U = BEM.util,

    BundleNodeName = exports.BundleNodeName = 'MachineBundleNode';


/** @exports MachineBundleNode */
Object.defineProperty(exports, BundleNodeName, {
    'get' : function() {
        return registry.getNodeClass(BundleNodeName);
    }
});


registry.decl(BundleNodeName, BundleNode, {

    getTechs : function() {

        return [
            'bemdecl.js',
            'deps.js',
            'bemjson.js',
            'bemhtml.js',
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

    'create-bemjson.js-node' : function(tech, bundleNode, magicNode) {
        return this.createDefaultTechNode.apply(this, arguments);
    },

    'create-bemjson.js-optimizer-node' : function() {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});
