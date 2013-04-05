/**
 * @fileOverview
 */

var PATH = require('path'),
    BEM = require('bem'),
    registry = require('bem/lib/nodesregistry'),

    nodes = require('bem/lib/nodes/node'),
    siteNodes = require('./site'),

    ArchNodeName = 'GenDocNode';


registry.decl('Arch', {

    alterArch : function() {
        var _t = this;
        return this.__base.apply(this, arguments)
            .then(this.createSiteNodes.bind(this))
            .then(function() {
                return _t.arch;
            });
    },

    createSiteNodes : function() {
        new (registry.getNodeClass(ArchNodeName))({
                arch : this.arch,
                root : this.root
            })
            .alterArch();
    }

});


registry.decl(ArchNodeName, nodes.NodeName, {

    __constructor : function(o) {
        this.__base.apply(this, arguments);

        this.arch = o.arch;
        this.root = o.root;
    },

    /**
     * A set of levels to build site from
     * @returns {Array}
     */
    getSources : function() {
        return [];
    },

    /**
     * TODO
     * @returns {Array}
     */
    getLands : function() {
        return [];
    },

    /**
     * @returns {Function}
     */
    alterArch : function() {
        var levels = this.getSources(),
            langs = this.getLands(),
            siteNode = new siteNodes.SiteNode({
                arch : this.arch,
                root : this.root,
                levels : levels,
                langs  : langs
            });

        siteNode.alterArch();
    }

});
