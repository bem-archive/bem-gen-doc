/**
 * @module nodes/sets
 */

var BEM = require('bem'),
    PATH = require('path'),
    registry = require('bem/lib/nodesregistry'),
    environ = require('../environ'),

    setsNode = require(environ.getLibPath('bem-pr', 'bem/nodes/sets.js')),

    MachineSetsNodeName = exports.MachineSetsNodeName = 'SetsNode';


/** @exports SetsNode */
Object.defineProperty(exports, MachineSetsNodeName, {
    'get' : function() {
        return registry.getNodeClass(MachineSetsNodeName);
    }
});


registry.decl(MachineSetsNodeName, setsNode.SetsNodeName, {

    __constructor : function(o) {

        this.__base.apply(this, arguments);

        //this.rootLevel = BEM.createLevel(o.output);
        this.levels = o.levels;

    },

    getSets : function() {

        return {
            // FIXME: hardcode
            'release' : this.levels
        };

    }

});


registry.decl('ExampleNode', {

    getTechs : function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml.js',
            'css',
            'js',
            'html'
            ];

    },

    getLevels : function() {

        var bemblLevels = ['blocks-common', 'blocks-desktop'].map(environ.getLibPath.bind(null, 'bem-bl')),
            selfLevels = [
                    'desktop.blocks',
                    this.rootLevel.getTech('blocks').getPath(this.getSourceNodePrefix())
                ].map(PATH.resolve.bind(null, environ.ENV_ROOT));

        return bemblLevels.concat(selfLevels);

    }

});
