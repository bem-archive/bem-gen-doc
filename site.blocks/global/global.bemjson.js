BEM.JSON.decl('global', {

    onBlock : function(ctx) {

        var data = ctx.params(),
            page = {
                block: 'page',
                title: data.pageTitle,
                mods: {}
            };

        ctx.tParam('environ', data.environ || {});
        ctx.tParam('decls', data.data);
        // XXX
        delete data.data;

        ctx.tParam('environ').name === 'index' && (page.mods.type = 'index');

        ctx.content(page);

    }

});
