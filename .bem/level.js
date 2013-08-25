var BEM = require('bem');

exports.baseLevelPath = require.resolve('bem/lib/levels/simple');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {
        'md'   : 'bem/lib/tech/v2'
    });

};
