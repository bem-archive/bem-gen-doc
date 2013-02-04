var BEM = require('bem'),
    environ = require('./environ');

exports.baseLevelPath = require.resolve('bem/lib/levels/project');

exports.getTechs = function() {

    return BEM.util.extend(this.__base() || {}, {
        'md'   : '',
        'sets' : environ.getLibPath('bem-pr', 'bem/techs/sets.js')
    });

};
