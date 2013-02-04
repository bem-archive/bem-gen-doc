var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'css'           : 'css',

        'bemhtml.js'    : join(BEMBL_TECHS, 'bemhtml'),

        'bemjson.js'    : join(PRJ_TECHS, 'bemjson.js'),
        'html'          : join(PRJ_TECHS, 'html')
        //'examples'      : join(PRJ_TECHS, 'examples')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];
