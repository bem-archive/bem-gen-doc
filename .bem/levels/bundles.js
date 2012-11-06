var PATH = require('path'),
    BEM = require('bem'),

    BEM_CORE_TECHS = PATH.resolve(__dirname,
            '../../bem-bl/blocks-common/i-bem/bem/techs');

exports.getTechs = function() {

    return {
        'bemjson.js'    : '',
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'css'           : 'css',
        'bemhtml'    : PATH.join(BEM_CORE_TECHS, 'bemhtml.js'),
        'html'          : PATH.join(BEM_CORE_TECHS, 'html')
    };

};

// Do not create any techs files during bundle creation by default
exports.defaultTechs = [];

