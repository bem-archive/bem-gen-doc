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
        
        'bemhtml'       : pjoin(BEMHTML_TECHS, 'bemhtml.js'),
        'html'          : pjoin(BEMBL_TECHS, 'html'),

        'bemtree.js'    : pjoin(PRJ_TECHS, 'bemtree.js')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];

