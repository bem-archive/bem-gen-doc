/**
 * @module nodes/site
 */

var PATH = require('path'),
    BEM = require('bem'),
    LOGGER = require('bem/lib/logger'),
    registry = require('bem/lib/nodesregistry'),

    outputNodes = require('./output'),

    nodes = BEM.require('./nodes/node'),

    SiteBundlesNode = require('./build').MachineBundlesNode,
    IntrospectNode = require('./introspect').IntrospectNode,
    ExamplesNode = require('./pr-sets').MachineExamplesNode,

    Q = BEM.require('q'),

    NodeName = exports.SiteNodeName = 'SiteNode';


/** @exports SiteNode */
Object.defineProperty(exports, NodeName, {
    'get' : function() {
        return registry.getNodeClass(NodeName);
    }
});


/**
 * @namespace
 */
registry.decl(NodeName, nodes.NodeName, {

    __constructor : function(o) {

        this.__base.apply(this, arguments);

        this.root = o.root;
        this.arch = o.arch;

        // FIXME: hardcode
        this.output = 'release';

        this.levels = o.levels;
        this.langs = o.langs;

    },

    alterArch : function(parent, children) {

        var _this = this;
        return Q.when(_this.createCommonSiteNode.call(_this, parent))
            .then(function(common) {
                parent && (common = [common].concat(parent));

                return Q.all([
                    common,
                    _this.createSiteBundlesNode(common, children),
                    _this.createIntrospectNode(common, children)
                ]);
            })
            .spread(_this.createOutputNode.bind(_this))
            .spread(function(common, bundle) {
                return _this.createExamplesNode(common, bundle, children);
            })
            .then(function() {
//                LOGGER.info(_this.arch.toString());
                return _this.arch;
            });

    },

    createCommonSiteNode : function(parent) {

        var node = new nodes.Node('site');
        this.arch.setNode(node, parent);

        return node.getId();

    },

    createSiteBundlesNode : function(parent, children) {

        var node = new SiteBundlesNode({
            root    : this.root,
            path    : this.output,
            levels  : this.levels
        });

        this.arch.setNode(node, parent, children);

        return node.getId();

    },

    createIntrospectNode : function(parent, children) {

        var node = new IntrospectNode({
            root : this.root,
            paths : this.levels,
            lands : this.langs,
        });

        this.arch.setNode(node, parent, children);

        return node.getId();

    },

    createExamplesNode : function(common, bundles, children) {
        var arch = this.arch,
            node = new ExamplesNode({
                root : this.root,
                output : this.output,
                sources : this.levels
            });

        arch.setNode(node, common, bundles);

        children && arch.addChildren(node, children);

        return node.getId();

    },

    /*
    createExamplesNode : function() {

        return new SetsNode({
                root : this.root,
                arch : this.arch,
                levels : this.levels
            })
            .alterArch(this.getId());

    },
    */

    /**
     * FIXME: BemCreateNode нельзя инициализировать из Arch, если output-уровень еще не создан
     */
    createOutputNode : function(parent, bundles, intraspector) {

        var outputNodeFactory = function(nodeClass, name) {
            return new nodeClass({
                root : this.root,
                level : PATH.join(this.root, this.output),
                techName : 'data.json',
                item : { block : name },
                info : { title : 'Библиотека блоков' }
            });
        }.bind(this);

        var index = outputNodeFactory(outputNodes.IndexNode, 'index'),
            catalogue = outputNodeFactory(outputNodes.CatalogueItemNode, 'catalogue');

        return Q.all([index, catalogue].map(function(node) {
                this.arch.setNode(node, parent, bundles, intraspector);
                return node;
            }, this))
            .then(function() {
                return [parent, bundles];
            });

    }

});
