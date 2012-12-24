var PATH = require('path'),
    environ = require('../environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    LIB_ROOT = environ.LIB_ROOT,

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = join(environ.getLibPath('bem-bl'), 'blocks-common/i-bem/bem/techs');


exports.baseLevelPath = require.resolve('./bundles.js');


exports.getTechs = function() {

    return require('BEM').util.extend(this.__base() || {}, {
        'blocks'        : '',
        'bemjson.js'    : '',
        'title.txt'     : '',

        'bemhtml.js'    : join(BEMBL_TECHS, 'bemhtml'),
        'html'          : join(BEMBL_TECHS, 'html')
    });

};