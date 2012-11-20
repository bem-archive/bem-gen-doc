var BEM = require('bem'),
    Q = BEM.require('qq'),
    
    DEFAULT_LANGS = ['ru', 'en'];
    

exports.techMixin = {
        
    getLangs: function() {
        var env = process.env.BEM_I18N_LANGS;
        return env? env.split(' ') : [].concat(DEFAULT_LANGS);
    },

    getDefaultLang: function() {
        return process.env.BEM_I18N_DEFAULT_LANG || this.getLangs().shift();
    },

    getSuffixForLang: function(lang) {
        return [lang, 'md'].join('.');
    },
    
    getSuffixes : function() {
        return this.getLangs().map(this.getSuffixForLang, this);
    },

    // XXX: Move to IntrospectNode
    readAllContent : function(prefix) {

        var res = {},
            suffix = this.getSuffixForLang(this.getDefaultLang());

        res[this.getTechName()] = this.readContent(this.getPath(prefix, suffix), suffix);

        return Q.shallow(res);

    }

};
