'use strict';

var PATH = require('path');

module.exports = function(registry) {

    registry.decl('ExampleNode', {

        getMachineExamplesTechs : function() {
            return ['bemjson.js'];
        },

        getMachineExamplesLevels : function() {
            return [];
        },

        getTechs : function() {

            var bundle = PATH.relative(this.root, this.getPath());
            if(bundle.indexOf(this.output + '/examples') === 0) {
                return this.getMachineExamplesTechs();
            }

            return this.__base.apply(this, arguments);

        },

        getLevels : function() {

            var bundle = PATH.relative(this.root, this.getPath());
            if(bundle.indexOf(this.output + '/examples') === 0) {
                return this.getMachineExamplesLevels();
            }

            return this.__base.apply(this, arguments);

        }

    });

};
