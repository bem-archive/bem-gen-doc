(function() {

var isArray = Array.isArray;


BEM.JSON.decl('block', {

    onBlock : function(ctx) {

        this._onParams(ctx);

    },

    onElem : function(ctx) {

        this._onParams(ctx);

    },

    /**
     * TODO: _onParams
     * @private
     * @param ctx
     */
    _onParams : function(ctx) {

        var params = ctx.params(),
            paramsMapper = {
                'title'         : this._getTitle,
                'description'   : this._getDescription,
                'examples'      : this._getExamples
            };

        Object.keys(paramsMapper).forEach(function(key) {

            isArray(params[key]) &&
                ctx.param(key, paramsMapper[key](params[key]), true);

        });

    },

    _getTitle : function(ctx) {

        ctx = ctx.map(function(c) {
            c.tag = '';
            return c;
        });

        if(!ctx.length)
            return ctx;

        // Для заголовков всегда возвращаем значение c последнего уровня
        return ctx.pop();

    },

    _getDescription : function(ctx) {

        return ctx.filter(function(c) {
            return c.content;
        }).map(function(c) {
            return {
                elem: 'level',
                name: c.level,
                content: c.content
            };
        });

    },

    _getExamples : function(ctx) {

        var url, id;
        return ctx.filter(function(c) {
            return c.content;
        }).map(function(c) {
            return {
                elem: 'examples',
                name: c.level,
                content: c.content.map(function(item) {
                        item.block = 'example';
                        if(item.url) {
                            url = item.url;
                            id = url.replace(/[\/\\\.]+/g, ':');

                            item.id = id;
                            item.url = url + '.html';
                            item.src = url + '.bemjson.js';
                        }
                        return item;
                    })
            };
        });

    }

});

}());