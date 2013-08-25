'use strict';

var BEM = require('bem'),
    PATH = require('path'),
    environ = require('bem-environ');

exports.baseLevelPath = BEM.require.resolve('./levels/simple');

exports.getTechs = function() {

    return {
        'sets'      : 'level-proto',
        'examples'  : 'level-proto'
    };

};
