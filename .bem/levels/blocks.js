var PATH = require('path'),
    environ = require('bem-environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(this, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'title.txt'  : 'title.txt',
        'css'        : 'v2/css',
        'js'         : 'v2/js-i',
        'priv.js'    : 'priv.js',

        'bemhtml'    : join(BEMBL_TECHS, 'bemhtml'),

        'examples'   : '',
        'desc.md'    : join(PRJ_TECHS, 'desc.md'),
        'bemjson.js' : join(PRJ_TECHS, 'bemjson.js')
    };

};
