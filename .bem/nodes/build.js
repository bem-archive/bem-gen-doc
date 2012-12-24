/**
 * @module nodes/build
 */

var PATH = require('path'),
    BEM = require('bem'),
    LOGGER = require('bem/lib/logger'),
    registry = require('bem/lib/nodesregistry'),

    BundlesLevelNode = require('./level').MachineBundlesLevelNode,

    Q = BEM.require('q'),
    QFS = BEM.require('q-fs'),
    MKDIRP = BEM.require('mkdirp'),

    BundlesNodeName = exports.BundlesNodeName = 'MachineBundlesNode',

    createLevel = BEM.createLevel,
    U = BEM.util,

    /** {String} */
    NODE_ID = 'machine-bundles';


/** @exports MachineBundlesNode */
Object.defineProperty(exports, BundlesNodeName, {
    'get' : function() {
        return registry.getNodeClass(BundlesNodeName);
    }
});


/**
 * @namespace
 */
registry.decl(BundlesNodeName, 'Node', {

    __constructor : function(o) {

        this.__base.apply(this, arguments);

        /**
         * Project root
         * @type String
         */
        this.root = o.root;

        /**
         * Site root
         * @type String
         */
        this.path = o.path;

        /**
         * @type Array
         */
        this.levels = o.levels;

    },

    getPath : function() {

        return PATH.resolve(this.root, this.path);

    },

    /**
     * FIXME: hardcode
     * @returns {String}
     */
    getSiteRootProto : function() {

        return PATH.resolve(__dirname, '../levels/bundles.js');

    },

    /**
     * FIXME: hardcode
     * @param bundle {String} имя бадла
     * @returns {Object[]}
     */
    getSiteBundleDecl : function(bundle) {

        return ({
            'index' : [
                { 'block' : 'global' },
                { 'block' : 'page', mods : { type : 'index' } },
                { 'block' : 'catalogue', mods : { type : 'showcase' } },
                { 'block' : 'catalogue', elems : ['item'] },
                { 'block' : 'block' }
            ],
            'catalogue' : [
                { 'block' : 'global' },
                { 'block' : 'page' },
                { 'block' : 'catalogue' },
                { 'block' : 'block' },
                { 'block' : 'example' },
                { 'block' : 'b-text' },
                { 'block' : 'b-link' }
            ],
            'examples' : []
        })[bundle];

    },

    createSiteRoot : function() {

        var root = this.getPath(),
            opts = {
                outputDir : PATH.dirname(root),
                level : this.getSiteRootProto()
            },
            names = [ PATH.basename(root) ];

        return BEM.api.create.level(opts, { names: names });

    },

    getSiteRoot : function() {

        if(!this._path) {
            this._path = createLevel(this.path);
        }

        return this._path;

    },

    createSiteBundle : function(bundle) {

        var decl = this.getSiteBundleDecl(bundle);
        if(!decl)
            return Q.reject(U.format('make error: unknown bundle %s', bundle));

        var level = this.getSiteRoot(),
            path = level.getPathByObj({ block: bundle }, 'bemdecl.js');

        return QFS.exists(path)
            .then(function(exists) {

                if(!exists) {
                    var res = 'exports.blocks = ' + JSON.stringify(decl, null, 4) + ';\n';

                    MKDIRP.sync(PATH.dirname(path));

                    return U.writeFile(path, res);
                }

                return Q.resolve(1);

            });

    },

    createSiteBundlesNode : function() {

        var arch = this.ctx.arch,
            bundleLevelNode = PATH.relative(this.root, this.path);

        if(arch.hasNode(bundleLevelNode)) {
            return arch.getNode(bundleLevelNode);
        }

        var node = new BundlesLevelNode({
                root : this.root,
                level : bundleLevelNode,
                levels : this.levels
            });

        arch.setNode(node, arch.getParents(this), this.getId());

        return node.getId();

    },

    make : function() {

        var _this = this,
            ctx = _this.ctx;

        return QFS.exists(this.getPath())
            .then(function(exists) {

                if(!exists)
                    return _this.createSiteRoot();

                return exists;

            })
            .then(function() {

                // FIXME: hardcode
                return Q.all(['index', 'catalogue'].map(_this.createSiteBundle, _this));

            })
            .then(function() {

                return ctx.arch.withLock(_this.createSiteBundlesNode, _this);

            })
            .then(function() {

                LOGGER.info(ctx.arch.toString());
                return ctx.arch;

            });

    }

}, {

    createId : function(o) {
        return NODE_ID + '*';
    }

});
