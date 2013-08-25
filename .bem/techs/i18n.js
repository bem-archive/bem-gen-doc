var DEFAULT_LANGS = ['ru', 'en'];

exports.API_VER = 2;

exports.LangMixin = {

    getLangs : function() {
        var env = process.env.BEM_I18N_LANGS;
        return env? env.split(' ') : [].concat(DEFAULT_LANGS);
    },

    getDefaultLang : function() {
        return process.env.BEM_I18N_DEFAULT_LANG || this.getLangs().shift();
    },

    getSuffixForLang : function(lang) {
        return lang + '.' + this.getTechName();
    }

};
