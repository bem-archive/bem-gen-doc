'use strict';

var BEM = require('bem'),
    PATH = require('path'),
    environ = require('bem-environ'),

    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');

exports.baseLevelPath = require.resolve('./bundles.js');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {
        'blocks'        : 'bem/lib/tech/v2',
        'bemjson.js'    : 'bem/lib/tech/v2',
        'title.txt'     : 'bem/lib/tech/v2',

        'bemhtml'       : PATH.join(BEMBL_TECHS, 'v2/bemhtml'),
        'html'          : PATH.join(BEMBL_TECHS, 'v2/html')
    });

};
