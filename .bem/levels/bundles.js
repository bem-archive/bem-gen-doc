var PATH = require('path'),
    BEM = require('bem'),

    pjoin = PATH.join,
    presolve = PATH.resolve.bind(null, __dirname),

    LIB_ROOT = presolve('../../lib'),

    PRJ_TECHS = presolve('../techs'),
    BEMHTML_TECHS = pjoin(LIB_ROOT, 'bem-html/.bem/techs'),
    BEMBL_TECHS = pjoin(LIB_ROOT, 'bem-bl/blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'css'           : 'css',

        'bemhtml.js'    : pjoin(BEMHTML_TECHS, 'bemhtml'),
        'bemjson.js'    : pjoin(PRJ_TECHS, 'bemjson.js'),
        'html'          : pjoin(PRJ_TECHS, 'html')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];

// Level naming scheme
exports['get-elem'] = function(block, elem) {
    return [block, elem].join('/');
};

exports['match-elem'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp([ '^(' + m + ')',
            '(' + m + ')(.*?)$'].join('/'))).exec(path);

    if (!match) return false;

    return {
        block: match[1],
        elem: match[2],
        suffix: match[3]
    };
};
