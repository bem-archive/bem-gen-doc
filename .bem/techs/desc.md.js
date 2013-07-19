var BEM = require('bem');

exports.techMixin = BEM.util.extend(require('./i18n.js').LangMixin, {

    getSuffixForLang : function(lang) {
        return [lang, 'md'].join('.');
    },

    getSuffixes : function() {
        return this.getLangs().map(this.getSuffixForLang, this);
    }

});
