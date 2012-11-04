var BEM = require('bem');

exports.baseLevelPath = require.resolve('bem/lib/levels/project');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {
        'md' : 'md'
    });

};
