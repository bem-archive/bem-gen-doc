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

        var params = ctx.params();

        isArray(params.title) &&
            ctx.param('title', this._getTitle(params.title), true);

        isArray(params.description) &&
            ctx.param('description', this._getDescription(params.description), true);

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

    }

});

}());