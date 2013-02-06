var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'bemjson.js'    : '',
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'css'           : 'css',

        'bemhtml.js'    : join(BEMBL_TECHS, 'bemhtml')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];
