var PATH = require('path'),
    BEM = require('bem'),

    registry = require('bem/lib/nodesregistry'),
    environ = require('../environ'),

    folder = require('../../../.bem/configs/site-config').folder,

    setsNodes = require(environ.getLibPath('bem-pr', 'bem/nodes/sets.js'));


registry.decl(setsNodes.ExampleNodeName, {

    getMachineExamplesTechs : function() {
        return [
            'bemjson.js'
        ];
    },

    getMachineExamplesLevels : function() {

        return [];

    },

    getTechs : function() {

        var bundle = PATH.relative(this.root, this.getPath());
        if(bundle.indexOf(folder + '/examples') === 0) {
            return this.getMachineExamplesTechs();
        }

        return this.__base.apply(this, arguments);

    },

    getLevels : function() {

        var bundle = PATH.relative(this.root, this.getPath());
        if(bundle.indexOf(folder + '/examples') === 0) {
            return this.getMachineExamplesLevels();
        }

        return this.__base.apply(this, arguments);

    }

});
