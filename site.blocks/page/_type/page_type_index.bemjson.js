BEM.JSON.decl({ name : 'page', modName : 'type', modVal : 'index' }, {

    onBlock : function(ctx) {

        ctx.content({ block : 'catalogue', mods: { type : 'showcase' } });

    }

});