/**
 * @module nodes/examples
 */

var PATH = require('path'),
    BEM = require('bem'),

    registry = require('bem/lib/nodesregistry'),
    BundlesLevelNodeName = require('bem/lib/nodes/level').BundlesLevelNodeName,
    BundleNodeName = require('bem/lib/nodes/bundle').BundleNodeName,
    environ = require('../environ'),

    Q = BEM.require('q'),

    createLevel = BEM.createLevel,
    log = require('../util').log,
    U = BEM.util,

    ExamplesNodeName = exports.ExamplesNodeName = 'MachineExamplesNode',

    // FIXME: hardcode
    NODE_ID = 'examples*';


Object.defineProperty(exports, ExamplesNodeName, {
    get : function() {
        return registry.getNodeClass(ExamplesNodeName);
    }
});


registry.decl(ExamplesNodeName, 'Node', {

    __constructor : function(o) {

        this.__base.apply(this, arguments);

        this.root = o.root;

        /** Где искать примеры */
        this.levels = o.levels;
        /** Куда складывать примеры */
        this.output = o.output;

    },

    filterExamplesPaths : function() {

        var examples = [];

        this.levels.forEach(function(/** String */ levelPath) {
            var level = createLevel(levelPath);

            [].push.apply(examples, level.getItemsByIntrospection()
                    .filter(function(item) {
                        return item.tech === 'examples';
                    })
                    .map(function(item) {
                        item.level = level.dir;
                        return item;
                    }));
        });

        return Q.all(examples);

    },

    getOutputPath : function() {
        return PATH.resolve(this.root, this.output);
    },

    getBaseOutputLevel : function() {
        return PATH.resolve(__dirname, '../levels/sets.js');
    },

    getOutputLevel : function() {

        if(!this._output)
            this._output = createLevel(this.getOutputPath());

        return this._output;

    },

    /**
     * @param root
     * @param [base]
     * @param [force]
     * @returns {Q.promise}
     */
    makeLevel : function(root, base, force) {

        if(force == null && typeof base === 'boolean') {
            force = base;
            base = null;
        }

        var opts = {
                outputDir : PATH.dirname(root),
                force : force
            },
            name = PATH.basename(root);

        base && (opts.level = base);

        return BEM.api.create.level(opts, { names : [name] });

    },

    copyExampleToOutput : function(bemitem) {

        var _this = this,
            level = createLevel(bemitem.level),
            outLevel = this.getOutputLevel(),
            outPath = outLevel.getPathByObj(bemitem, bemitem.tech);

        level = createLevel(level.getPathByObj(bemitem, bemitem.tech));

        // FIXME: hardcode
        return this.makeLevel(outPath, PATH.join(this.root, '.bem/levels/bundles.js'), true)
            .then(function() {

                outLevel = createLevel(outPath);

                return Q.all(level.getItemsByIntrospection()
                    .filter(function(item) {
                        // FIXME: hardcode
                        return ~['bemjson.js'].indexOf(item.tech);
                    })
                    .map(function(item) {

                        var src = level.getPathByObj(item, item.tech),
                            desc = outLevel.getPathByObj(item, item.tech);

                        return _this.storeExampleToDesc(src, desc);

                    }));

            });

    },

    storeExampleToDesc : function(src, desc) {

        U.mkdirp(PATH.dirname(desc));

        return U.readFile(src)
            .then(function(data) {

                return U.writeFileIfDiffers(desc, data)
                    .then(function() {
                        return desc;
                    });

            });

    },

    make : function() {

        var _this = this,
            ctx = this.ctx;

        return this.filterExamplesPaths()
            .then(function(items) {

                // FIXME: hardcode
                return _this.makeLevel(_this.getOutputPath(),
                        require.resolve(_this.getBaseOutputLevel()))
                    .then(function() {

                        return Q.all(items.map(function(item) {
                            return _this.copyExampleToOutput(item);
                        }));

                    });

            })
            .then(function() {

                return Q.all(_this.getOutputLevel().getItemsByIntrospection()
                    .filter(function(item) {
                        return item.tech === 'examples';
                    })
                    .map(function(item) {

                        var path = _this.getOutputLevel().getPathByObj(item, item.tech),
                            arch = ctx.arch,
                            node = new (registry.getNodeClass('MachineExamplesLevel'))({
                                root    : _this.root,
                                level   : createLevel(path)
                            });

                        arch.setNode(node, arch.getParents(_this));

                        return node.getId();

                    }));

            })
            .done();

    }

}, {

    createId : function(o) {
        return NODE_ID;
    }

});


registry.decl('MachineExamplesLevel', BundlesLevelNodeName, {

    itemNodeClassName : 'MachineExampleNode'

});


registry.decl('MachineExampleNode', BundleNodeName, {

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
                    PATH.join(PATH.dirname(this.getNodePrefix()), 'blocks')
                ].map(PATH.resolve.bind(null, environ.ENV_ROOT));

        return bemblLevels.concat(selfLevels);

    }

});
