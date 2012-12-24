/**
 * @module nodes/level
 */

var BEM = require('bem'),
    registry = require('bem/lib/nodesregistry'),
    BundlesLevelNode = require('bem/lib/nodes/level').BundlesLevelNode,
    BundleNodeName = require('./bundle').BundleNodeName,

    _ = BEM.require('underscore'),

    BundlesLevelNodeName = exports.BundlesLevelNodeName = 'MachineBundlesLevelNode',
    U = BEM.util;


/** @exports MachineBundlesLevelNode */
Object.defineProperty(exports, BundlesLevelNodeName, {
    'get' : function() {
        return registry.getNodeClass(BundlesLevelNodeName);
    }
});


registry.decl(BundlesLevelNodeName, BundlesLevelNode, {

    itemNodeClassName : BundleNodeName,

    getBundleSourceTechs : function() {
        return ['bemdecl.js'];
    },

    /**
     * @returns
     * @override
     */
    scanLevelItems : function() {

        return _.uniq(
            _.sortBy(
                this.level.getItemsByIntrospection()
                    .filter(function(item) {

                        var type = U.bemType(item);

                        // filter out merged bundle, it will be configured later
                        if(type === 'block' && item.block === this.mergedBundleName()) return false;

                        // build only blocks and elems that have file in bemjson.js or bemdecl.js techs
                        return ~['block', 'elem'].indexOf(type) && ~this.getBundleSourceTechs().indexOf(item.tech);

                    }, this),
                U.bemKey),
            true,
            U.bemKey);

    }

});
