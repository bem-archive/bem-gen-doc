'use strict';

var BEM = require('bem'),
    PATH = require('path'),

    PRJ_TECHS = PATH.resolve(__dirname, '../techs');

exports.baseLevelPath = require.resolve('./bundles.js');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {

        'bemjson.js' : PATH.join(PRJ_TECHS, 'bemjson.js'),
        'html'       : PATH.join(PRJ_TECHS, 'html'),
        'sets'       : PATH.join(PRJ_TECHS, 'sets'),
        'data.json'  : 'bem/lib/tech/v2'

    });

};

exports['get-elem'] = function(block, elem) {
    return [block, elem].join('/');
};

exports['match-elem'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp([ '^(' + m + ')',
            '(' + m + ')(.*?)$'].join('/'))).exec(path);

    if (!match) return false;

    return {
        block  : match[1],
        elem   : match[2],
        suffix : match[3]
    };
};
