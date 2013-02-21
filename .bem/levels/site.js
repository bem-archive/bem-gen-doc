var BEM = require('bem'),
    PATH = require('path'),

    environ = require('../environ'),
    join = PATH.join,

    PRJ_TECHS = PATH.resolve(__dirname, '../techs');

exports.baseLevelPath = require.resolve('./bundles.js');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {

        'bemjson.js' : join(PRJ_TECHS, 'bemjson.js'),
        'html'       : join(PRJ_TECHS, 'html')

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