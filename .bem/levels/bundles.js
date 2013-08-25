var PATH = require('path'),
    environ = require('bem-environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'blocks'        : 'bem/lib/tech/v2',
        'bemjson.js'    : 'bem/lib/tech/v2',

        'bemdecl.js'    : 'v2/bemdecl.js',
        'deps.js'       : 'v2/deps.js',
        'js'            : 'v2/js-i',
        'css'           : 'v2/css',

        'html'          : join(BEMBL_TECHS, 'v2/html'),
        'bemhtml.js'    : join(BEMBL_TECHS, 'v2/bemhtml')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];
