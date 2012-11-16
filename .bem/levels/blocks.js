var PATH = require('path'),

    BEMBL_TECHS = PATH.resolve(__dirname, '../../lib/bem-bl/blocks-common/i-bem/bem/techs');


exports.getTechs = function() {
    var techs = {
            'title.txt' : 'title.txt',
            'desc.txt'  : 'desc.txt',
            'bemhtml'   : PATH.join(BEMBL_TECHS, 'bemhtml'),
            'css'       : 'css',
            'js'        : 'js',
            'priv.js'   : 'priv.js',
            'examples'  : 'bem/lib/techs/examples.js'
        };
    return techs;
};

exports['get-elem'] = function(block, elem) {
    return [block,
        elem,
        block + '__' + elem].join('/');
};

exports['get-elem-mod'] = function(block, elem, mod) {
    return [block,
        elem,
        '_' + mod,
        block + '__' + elem + '_' + mod].join('/');
};

exports['get-elem-mod-val'] = function(block, elem, mod, val) {
    return [block,
        elem,
        '_' + mod,
        block + '__' + elem + '_' + mod + '_' + val].join('/');
};

exports['match-elem'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp(['^(' + m + ')',
            '(' + m + ')',
            '\\1__\\2(.*?)$'].join('/'))).exec(path);

    if (!match) return false;

    return {
        block: match[1],
        elem: match[2],
        suffix: match[3]
    };
};

exports['match-elem-mod'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp(['^(' + m + ')',
            '(' + m + ')',
            '_(' + m + ')',
            '\\1__\\2_\\3(.*?)$'].join('/'))).exec(path);

    if (!match) return false;

    return {
        block: match[1],
        elem: match[2],
        mod: match[3],
        suffix: match[4]
    };
};

exports['match-elem-mod-val'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp(['^(' + m + ')',
            '(' + m + ')',
            '_(' + m + ')',
            '\\1__\\2_\\3_(' + m + ')(.*?)$'].join('/'))).exec(path);

    if (!match) return false;

    return {
        block: match[1],
        elem: match[2],
        mod: match[3],
        val: match[4],
        suffix: match[5]
    };
};
