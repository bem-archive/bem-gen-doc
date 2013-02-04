var PATH = require('path'),
    environ = require('../../.bem/environ');

exports.baseLevelPath = require.resolve('../../.bem/levels/bundles.js');

exports.getConfig = function() {

    return {
        bundleBuildLevels : ['blocks-common', 'blocks-desktop']
            .map(environ.getLibPath.bind(null, 'bem-bl'))
            .concat(
                ['common.blocks', 'desktop.blocks']
                    .map(PATH.resolve.bind(null, environ.PRJ_ROOT)))
    };

};
