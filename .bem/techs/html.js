var BEM = require('bem'),
    PATH = require('path'),

    environ = require('bem-environ'),

    Q = BEM.require('q'),
    U = BEM.util,

    LIB_ROOT = environ.LIB_ROOT;

exports.API_VER = 2;

exports.getBaseTechPath = require.resolve(
        environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs/v2/html.js'));

exports.techMixin = {

    getOptimizedPrefix : function(prefix) {
        return PATH.join(PATH.dirname(prefix), '_' + PATH.basename(prefix));
    },

    getBemjson : function(prefix) {

        var path = this.getPath(this.getOptimizedPrefix(prefix), 'bemjson.js');
        return U.readFile(path)
            .then(function(data) {
                return ( new Function('global', 'BEM', '"use strict";' + data + ';return BEM.JSON;') )();
            });

    },

    getBemhtml : function(prefix) {

        var path = this.getPath(this.getOptimizedPrefix(prefix), 'bemhtml.js');
        return Q.resolve(require(path).BEMHTML);

    },

    getDataCtx : function(prefix) {

        // TODO
        var path = this.getPath(prefix, 'data.json');
        return U.readFile(path)
            .then(function(data) {
                return JSON.parse(data);
            });

    },

    getHtml : function(bemhtml, bemjson, data) {

        return Q.all([bemhtml, bemjson, data])
            .spread(function(BEMHTML, BEMJSON, data) {

                var json = BEMJSON.build(data);
                return BEMHTML.apply(json);

            });

    },

    getCreateResult : function(path, suffix, vars) {

        var prefix = vars.Prefix;
        return this.getHtml(
            this.getBemhtml(prefix),
            this.getBemjson(prefix),
            this.getDataCtx(prefix));

    },

    getDependencies : function() {
        return ['bemjson.js', 'bemhtml.js'];
    }

};
