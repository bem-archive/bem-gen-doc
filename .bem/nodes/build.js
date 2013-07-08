/**
 * @module nodes/build
 */

var BEM = require('bem'),
    PATH = require('path'),
    LOGGER = require('bem/lib/logger'),
    registry = require('bem/lib/nodesregistry'),

    createNodes = require('bem/lib/nodes/create'),

    BundlesLevelNode = require('./level').MachineBundlesLevelNode,

    Q = BEM.require('q'),
    QFS = BEM.require('q-fs'),

    BundlesNodeName = exports.BundlesNodeName = 'MachineBundlesNode',

    createLevel = BEM.createLevel,
    U = BEM.util;


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
     * Базовый конфиг для уровня бандлов сайта
     * @returns {String}
     */
    getSiteRootProto : function() {
        return PATH.resolve(__dirname, '../levels/site.js');
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
            this._path = createLevel(this.getPath());
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

                    return QFS.makeTree(PATH.dirname(path))
                        .then(function() {
                            return U.writeFile(path, res);
                        });
                }

                return Q.resolve(1);

            });

    },

    /**
     * @param name
     * @returns {Function}
     */
    createSiteSetsNode : function(name) {

        var ctx = this.ctx;

        return function() {

            var arch = ctx.arch,
                level = this.getSiteRoot(),
                tech = 'sets',
                item = { block : name, tech : tech },

                node = new createNodes.BemCreateNode({
                    root     : this.root,
                    level    : level,
                    item     : item,
                    techName : tech
                });

            arch.setNode(node, arch.getParents(this));

            return node.getId();
        };

    },

    createSiteBundlesNode : function() {

        var arch = this.ctx.arch,
            bundleLevelNode = PATH.relative(this.root, this.getPath());

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
                createLevel(_this.getPath(), { noCache: true });
            })
            .then(function() {
                // FIXME: hardcode
                return Q.all(['index', 'catalogue'].map(_this.createSiteBundle, _this));
            })
            .then(function() {
                return ctx.arch.withLock(_this.createSiteSetsNode('examples'), _this);
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
        return 'machine-bundles*';
    }

});
