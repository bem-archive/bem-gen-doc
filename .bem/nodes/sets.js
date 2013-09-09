'use strict';

var PATH = require('path'),
    BEM = require('bem');

module.exports = function(registry) {

    registry.decl('MachineExamplesNode', 'Node', {

        __constructor : function(o) {
            this.__base(o);

            this.root = o.root;
            this.rootLevel = BEM.createLevel(o.root);

            /** Куда складывать примеры: setsRoot */
            this.output = o.output;
            /** Где искать примеры */
            this.sources = o.sources;
        },

        getPath : function() {
            return PATH.join(this.root, this.output);
        },

        make : function() {
            return this.ctx.arch.withLock(this.alterArch(), this);
        },

        /**
         * @returns {Function}
         */
        alterArch : function() {
            var ctx = this.ctx;

            return function() {
                var arch = ctx.arch,
                    node = this.createSetsLevelNode();

                arch.setNode(node, arch.getParents(this));

                // try to link: examples/examples.sets -> examples
                var childNode = PATH.dirname(node.path);
                if(arch.hasNode(childNode)) {
                    arch.addChildren(node, childNode);
                }
            };
        },

        getOutputLevel : function() {
            if(!this._outputLevel) {
                this._outputLevel = BEM.createLevel(this.getPath());
            }
            return this._outputLevel;
        },

        createSetsLevelNode : function() {
            return registry.getNodeClass('MachineSetsLevelNode')
                .create({
                    root    : this.root,
                    level   : this.getOutputLevel(),
                    item    : { block : 'examples', tech : 'sets' },
                    sources : this.sources
                });
        }

    }, {

        createId : function() {
            // FIXME: hardcode
            return 'machine-examples*';
        }

    });

    registry.decl('MachineSetsLevelNode', 'SetsLevelNode', {});

};
