'use strict';

var PATH = require('path'),
    BEMJSON_CORE = require.resolve('bem-json/i-bem/__json/i-bem__json.js');

exports.baseTechName = 'js';

exports.techMixin = {

    getBuildSuffixes : function() {
        return ['bemjson.js'];
    },

    getBuildSuffixesMap : function() {
        return {
            'bemjson.js': this.getBuildSuffixes()
        };
    },

    getBuildResult : function(files, suffix, output) {
        var _this = this;
        return this.__base.apply(this, arguments).then(function(res) {
            res.unshift(_this.getBemjsonCore(output));
            return res;
        });
    },

    getBemjsonCore : function(outputDir) {
        if(this.API_VER === 2) {
            outputDir = PATH.dirname(outputDir);
        }
        return this.getBuildResultChunk(PATH.relative(outputDir, BEMJSON_CORE));
    },

    getDependencies : function() {
        return ['bemdecl.js'];
    }

};
