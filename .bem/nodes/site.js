var PATH = require('path'),
    BEM = require('bem'),
    LOGGER = require('bem/lib/logger'),
    registry = require('bem/lib/nodesregistry'),

    outputNodes = require('./output'),
    SiteBundlesNode= require('./build').SiteBundlesNode,
    IntrospectNode = require('./introspect').IntrospectNode,

    Q = BEM.require('q'),

    NodeName = exports.SiteNodeName = 'SiteNode';


exports.__defineGetter__(NodeName, function() {
    return registry.getNodeClass(NodeName);
});


/**
 * @namespace
 */
registry.decl(NodeName, 'Node', {

    __constructor : function(o) {

        this.__base.apply(this, arguments);

        this.root = o.root;
        this.arch = o.arch;

        // FIXME: hardcode
        this.output = 'release';

        this.levels = o.levels;
        this.langs = o.langs;

    },

    alterArch : function() {

        var _this = this;

        return Q.all([this.createSiteBundlesNode(), this.createIntrospectNode()])
            .then(function(bundles, intraspector) {
                return _this.createOutputNode(bundles, intraspector);
            })
            .then(function() {
                LOGGER.info(_this.arch.toString());
                return _this.arch;
            });

    },

    createSiteBundlesNode : function() {

        var node = new SiteBundlesNode({
            root : this.root,
            path : this.output
        });

        this.arch.setNode(node, this.getId());

        return node.getId();

    },

    createIntrospectNode : function() {

        var node = new IntrospectNode({
            root : this.root,
            // FIXME: hardcode
            paths : this.levels,
            lands : this.langs,
        });

        this.arch.setNode(node, this.getId());

        return node.getId();

    },

    createExamplesNode : function() {

    },

    /**
     * FIXME: BemCreateNode нельзя инициализировать из Arch, если output-уровень еще не создан
     */
    createOutputNode : function(bundles, intraspector) {

        var index = new outputNodes.IndexNode({
                root : this.root,
                level : PATH.join(this.root, this.output),
                techName : 'data.json',
                item : { block : 'index' },
                info : { title : 'Библиотека блоков' }
            }),
            catalogue = new outputNodes.CatalogueItemNode({
                root : this.root,
                level : PATH.join(this.root, this.output),
                techName : 'data.json',
                item : { block : 'catalogue' },
                info : { title : 'Библиотека блоков' }
            });

        return [index, catalogue].map(function(node) {
            this.arch.setNode(node, this.getId(), bundles, intraspector);
            return this.getId();
        }, this);

    }

}, {

    createId : function(o) {
        return o.id;
    }

});
