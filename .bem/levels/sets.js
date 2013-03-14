var PATH = require('path'),
    environ = require('../environ'),
    PRJ_TECHS = PATH.resolve(__dirname, '../techs');

exports.baseLevelPath = require.resolve('bem/lib/levels/simple');

exports.getTechs = function() {

    return {
        'sets'      : PATH.join(PRJ_TECHS, 'sets.js'),
        'examples'  : PATH.join(environ.getLibPath('bem-pr', 'bem/techs/examples.js'))
    };

};