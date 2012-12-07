exports.baseLevelPath = require.resolve('./bundles.js');

exports.getTechs = function() {

    return require('BEM').util.extend(this.__base() || {}, {
        'bemjson.js'    : '',
        'title.txt'     : ''
    });

};