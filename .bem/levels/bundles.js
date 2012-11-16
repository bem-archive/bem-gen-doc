var PATH = require('path'),
    BEM = require('bem'),

    pjoin = PATH.join,
    presolve = PATH.resolve.bind(null, __dirname),

    LIB_ROOT = presolve('../../lib'),

    PRJ_TECHS = presolve('../techs'),
    BEM_CORE_TECHS = pjoin(LIB_ROOT, 'bem-bl/blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
//        'bemjson.js'    : '',
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'css'           : 'css',
        'bemhtml'       : pjoin(BEM_CORE_TECHS, 'bemhtml.js'),
        'html'          : pjoin(BEM_CORE_TECHS, 'html'),

        'bemtree.js'    : pjoin(PRJ_TECHS, 'bemtree.js')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];

