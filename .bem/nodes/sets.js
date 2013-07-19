var PATH = require('path'),
    BEM = require('bem'),

    registry = require('bem/lib/nodesregistry'),
    environ = require('bem-environ'),

    nodes = require('bem/lib/nodes/node.js'),
    examplesNodes = require('./examples.js'),
    setsNodes = require(environ.getLibPath('bem-pr', 'bem/nodes/sets.js')),

    ExamplesNodeName = exports.ExamplesNodeName = 'MachineExamplesNode',
    SetsLevelNodeName = exports.SetsLevelNodeName = 'MachineSetsLevelNode',

    createLevel = BEM.createLevel;


Object.defineProperty(exports, ExamplesNodeName, {
    get : function() {
        return registry.getNodeClass(ExamplesNodeName);
    }
});


registry.decl(ExamplesNodeName, nodes.NodeName, {

    __constructor : function(o) {
        this.__base(o);

        this.root = o.root;
        this.rootLevel = createLevel(o.root);

        /** Куда складывать примеры: setsRoot */
        this.output = o.output;
        /** Где искать примеры */
        this.sources = o.sources;
    },

    getPath : function() {
        return PATH.resolve(this.root, this.output);
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
        };
    },

    getOutputLevel : function() {
        if(!this._outputLevel)
            this._outputLevel = createLevel(this.getPath());
        return this._outputLevel;
    },

    createSetsLevelNode : function() {
        var node = new (registry.getNodeClass(SetsLevelNodeName))({
                root    : this.root,
                level   : this.getOutputLevel(),
                item    : { block : 'examples', tech : 'sets' },
                sources : this.sources
            });

        return node;
    }

}, {

    createId : function() {
        // XXX: hardcode
        return 'machine-examples*';
    }

});


Object.defineProperty(exports, SetsLevelNodeName, {
    get : function() {
        return registry.getNodeClass(SetsLevelNodeName);
    }
});


registry.decl(SetsLevelNodeName, setsNodes.SetsLevelNodeName, {

});

