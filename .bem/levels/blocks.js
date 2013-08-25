'use strict';

var PATH = require('path'),
    environ = require('bem-environ'),

    PRJ_TECHS = PATH.resolve(__dirname, '../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'title.txt'  : 'bem/lib/tech/v2',
        'css'        : 'v2/css',
        'js'         : 'v2/js-i',
        'priv.js'    : 'bem/lib/tech/v2',

        'bemhtml'    : PATH.join(BEMBL_TECHS, 'v2/bemhtml'),

        'examples'   : 'level-proto',
        'desc.md'    : PATH.join(PRJ_TECHS, 'desc.md'),
        'bemjson.js' : PATH.join(PRJ_TECHS, 'bemjson.js')
    };

};
