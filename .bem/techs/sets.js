var PATH = require('path'),
    environ = require('../environ.js');

exports.baseTechPath = environ.getLibPath('bem-pr', 'bem/techs/sets.js');

exports.getBaseLevel = function() {
    return PATH.resolve(environ.ENV_ROOT, '.bem/levels/' + this.getTechName() + '.js');
};
