var PATH = require('path'),

    pjoin = PATH.join,
    presolve = PATH.resolve.bind(this, __dirname),

    LIB_ROOT = presolve('../../lib'),
    PRJ_TECHS = presolve('../techs'),
    BEMHTML_TECHS = presolve(LIB_ROOT, 'bem-html/.bem/techs');


exports.getTechs = function() {
    return {
            'title.txt' : 'title.txt',
            
            'css'       : 'css',
            'js'        : 'js',
            'examples'  : 'bem/lib/techs/examples.js',
            'priv.js'   : 'priv.js',
            
            'bemhtml'   : pjoin(BEMHTML_TECHS, 'bemhtml'),
            'desc.md'   : pjoin(PRJ_TECHS, 'desc.md'),
            'bemtree.js': pjoin(PRJ_TECHS, 'bemtree.js')
        };
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
