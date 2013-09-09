'use strict';

var PATH = require('path'),

    BEMBL_TECHS = PATH.resolve(__dirname, '../../libs/bem-bl/blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'blocks'        : 'bem/lib/tech/v2',
        'bemjson.js'    : 'bem/lib/tech/v2',

        'bemdecl.js'    : 'v2/bemdecl.js',
        'deps.js'       : 'v2/deps.js',
        'js'            : 'v2/js-i',
        'css'           : 'v2/css',

        'html'          : PATH.join(BEMBL_TECHS, 'v2/html'),
        'bemhtml'       : PATH.join(BEMBL_TECHS, 'v2/bemhtml')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];
