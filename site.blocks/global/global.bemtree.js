BEM.JSON.decl('global', {

    onBlock : function(ctx) {

        var data = ctx.params(),
            page = {
                block: 'page',
                title: data.pageTitle,
                name: data.pageName,
                mods: {}
            };

        ctx.tParam('decls', data.data);
        delete data.data;

        data.pageName === 'index' && (page.mods.type = 'index');

        ctx.content(page);

    }

});
