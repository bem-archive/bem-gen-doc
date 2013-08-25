var PATH = require('path'),
    BEM = require('bem'),
    environ = require('bem-environ'),

    extend = require('bem/lib/util').extend,
    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs');


exports.getTechs = function() {

    return extend(require('./bundles.js').getTechs(), {
        'blocks'        : 'bem/lib/tech/v2',
        'bemjson.js'    : 'bem/lib/tech/v2',
        'title.txt'     : 'bem/lib/tech/v2',

        'bemhtml'       : join(BEMBL_TECHS, 'v2/bemhtml'),
        'html'          : join(BEMBL_TECHS, 'v2/html')
    });

};
