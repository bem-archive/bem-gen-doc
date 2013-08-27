'use strict';

var BEM = require('bem'),
    _ = BEM.require('underscore'),
    U = BEM.util;

module.exports = function(registry) {

    registry.decl('MachineBundlesLevelNode', 'BundlesLevelNode', {

        itemNodeClassName : 'BundleNode',

        getBundleSourceTechs : function() {
            return ['bemdecl.js'];
        },

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

};
