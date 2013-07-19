var PATH = require('path'),
    environ = require('bem-environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'blocks'        : '',
        'bemjson.js'    : '',

        'bemdecl.js'    : 'v2/bemdecl.js',
        'deps.js'       : 'v2/deps.js',
        'js'            : 'v2/js-i',
        'css'           : 'v2/css',

        'html'          : join(BEMBL_TECHS, 'html'),
        'bemhtml.js'    : join(BEMBL_TECHS, 'bemhtml')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];
