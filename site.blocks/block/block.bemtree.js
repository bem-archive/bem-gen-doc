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
        
        Array.isArray(params.title) &&
            ctx.param('title', this._getTitle(params.title), true);
        
    },
    
    _getTitle : function(ctx) {
        
        if(!ctx.length)
            return ctx;
        
        // Для заголовков всегда возвращаем значение c последнего уровня
        return ctx.pop();
        
    }
    
});