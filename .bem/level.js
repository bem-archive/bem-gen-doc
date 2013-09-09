'use strict';

var BEM = require('bem');

exports.baseLevelPath = BEM.require.resolve('./levels/project');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {
        'md'   : 'bem/lib/tech/v2'
    });

};
