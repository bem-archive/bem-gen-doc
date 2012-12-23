var PATH = require('path'),

    pjoin = PATH.join,
    presolve = PATH.resolve.bind(null, __dirname),

    LIB_ROOT = presolve('../../lib'),

    PRJ_TECHS = presolve('../techs'),
    BEMBL_TECHS = pjoin(LIB_ROOT, 'bem-bl/blocks-common/i-bem/bem/techs');


exports.baseLevelPath = require.resolve('./bundles.js');


exports.getTechs = function() {

    return require('BEM').util.extend(this.__base() || {}, {
        'blocks'        : '',
        'bemjson.js'    : '',
        'title.txt'     : '',

        'bemhtml.js'    : pjoin(BEMBL_TECHS, 'bemhtml'),
        'html'          : pjoin(BEMBL_TECHS, 'html')
    });

};