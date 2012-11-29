(function(BEM) {

function getTechPath(name, tech) {
    return ['_' + name, tech].join('.');
}


BEM.JSON.decl('page', {

    onBlock : function(ctx) {

        var params = ctx.params(),
            env = ctx.tParam('environ'),
            name = env.name;

        ctx
            .param('assets', [
                { elem : 'css', url: getTechPath(name, 'css') },
                { elem : 'js', url: '//yandex.st/jquery/1.8.2/jquery.min.js' },
                { elem : 'js', url: getTechPath(name, 'js') }
            ])
            .content({ block : 'catalogue' });

    }

});

}(BEM));
