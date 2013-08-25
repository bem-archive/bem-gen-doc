var PATH = require('path'),
    environ = require('bem-environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(this, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'title.txt'  : 'bem/lib/tech/v2',
        'css'        : 'v2/css',
        'js'         : 'v2/js-i',
        'priv.js'    : 'bem/lib/tech/v2',

        'bemhtml'    : join(BEMBL_TECHS, 'v2/bemhtml'),

        'examples'   : 'bem/lib/tech/v2',
        'desc.md'    : join(PRJ_TECHS, 'desc.md'),
        'bemjson.js' : join(PRJ_TECHS, 'bemjson.js')
    };

};
