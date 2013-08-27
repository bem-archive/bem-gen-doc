'use strict';

var PATH = require('path'),
    BEM = require('bem'),
    Q = BEM.require('q');

module.exports = function(registry) {

    registry.decl('SiteNode', 'Node', {

        __constructor : function(o) {

            this.__base.apply(this, arguments);

            this.root = o.root;
            this.arch = o.arch;
            this.output = o.output;
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
                    return _this.arch;
                });

        },

        createCommonSiteNode : function(parent) {

            var node = new (registry.getNodeClass('Node'))('site');
            this.arch.setNode(node, parent);

            return node.getId();

        },

        createSiteBundlesNode : function(parent, children) {

            var node = new (registry.getNodeClass('MachineBundlesNode'))({
                    root    : this.root,
                    path    : this.output,
                    levels  : this.levels
                });

            this.arch.setNode(node, parent, children);

            return node.getId();

        },

        createIntrospectNode : function(parent, children) {

            var node = new (registry.getNodeClass('IntrospectNode'))({
                root : this.root,
                paths : this.levels,
                lands : this.langs
            });

            this.arch.setNode(node, parent, children);

            return node.getId();

        },

        createExamplesNode : function(common, bundles, children) {

            var arch = this.arch,
                node = new (registry.getNodeClass('MachineExamplesNode'))({
                    root : this.root,
                    output : this.output,
                    sources : this.levels
                });

            arch.setNode(node, common, bundles);

            children && arch.addChildren(node, children);

            return node.getId();

        },

        /**
         * FIXME: BemCreateNode нельзя инициализировать из Arch, если output-уровень еще не создан
         */
        createOutputNode : function(parent, bundles, intraspector) {

            var outputNodeFactory = function(nodeClassName, name) {
                return new (registry.getNodeClass(nodeClassName))({
                    root : this.root,
                    level : PATH.resolve(this.root, this.output),
                    techName : 'data.json',
                    item : { block : name },
                    info : { title : 'Библиотека блоков' }
                });
            }.bind(this);

            var index = outputNodeFactory('IndexNode', 'index'),
                catalogue = outputNodeFactory('CatalogueItemNode', 'catalogue');

            return Q.all([index, catalogue].map(function(node) {
                    this.arch.setNode(node, parent, [bundles, intraspector]);
                    return node;
                }, this))
                .then(function() {
                    return [parent, bundles];
                });

        }

    });

};
