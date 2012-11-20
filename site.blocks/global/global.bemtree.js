BEM.JSON.decl('global', {

    onBlock : function(ctx) {

        var data = ctx.params();

        ctx.tParam('decls', data.decls);
        delete data.decls;

        ctx.content({
                block: 'page',
                title: data.pageTitle,
                name: data.pageName
            });

    }

})
