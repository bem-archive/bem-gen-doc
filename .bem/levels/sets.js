'use strict';

var BEM = require('bem');

exports.baseLevelPath = BEM.require.resolve('./levels/simple');

exports.getTechs = function() {

    return {
        'tests'     : 'level-proto',
        'examples'  : 'level-proto'
    };

};
