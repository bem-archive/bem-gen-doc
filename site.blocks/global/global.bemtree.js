BEM.JSON.decl('global', {

    onBlock : function(ctx) {

        var data = ctx.params();

        ctx.tParam('decls', data.data);
        delete data.data;

        ctx.content({
                block: 'page',
                title: data.pageTitle,
                name: data.pageName
            });

    }

})
