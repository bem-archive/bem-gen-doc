var BEM = require('bem'),
    PATH = require('path'),

    Q = BEM.require('q'),
    U = BEM.util,

    LIB_ROOT = PATH.resolve(__dirname, '../../lib');


exports.getBaseTechPath = require.resolve(PATH.join(LIB_ROOT, 'bem-bl/blocks-common/i-bem/bem/techs/html.js'));


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
        console.log(prefix);
        return this.getHtml(
            this.getBemhtml(prefix),
            this.getBemjson(prefix),
            this.getDataCtx(prefix));

    },

    getDependencies : function() {
        return ['bemjson.js', 'bemhtml.js'];
    }

};
