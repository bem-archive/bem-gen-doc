(function() {

function createBemjson(ctx, type) {

    if(!ctx) return;

    var obj;

    if(Array.isArray(ctx)) {
        obj = [];

        ctx.forEach(function(item) {
            obj.push(createBemjson(item, type));
        });

        return obj;
    };

    obj = {};

    !type || type === 'block' ?
        obj.block = 'block' :
        obj.elem = type;

    obj.name = ctx.name;
    obj.title = ctx.title || [];
    obj.description = ctx.description || [];
    obj.examples = ctx.examples || [];

    ctx.url && (obj.url = ctx.url);

    var content = obj.content || (obj.content = []);

    var mods = createBemjson(ctx.mods, 'mod');
    mods && [].push.apply(content, mods);

    var vals = createBemjson(ctx.vals, 'mod-val');
    vals && [].push.apply(content, vals);

    var elems = createBemjson(ctx.elems, 'elem');
    elems && [].push.apply(content, elems);

    return obj;

}


BEM.JSON.decl('catalogue', {

   onBlock : function(ctx) {

       var typ = ctx.mod('type'),
           env = ctx.tParam('environ'),
           root = env['site-root'] + '/index/index.html',
           json = [];

       typ === 'showcase' || json.push({
               block: 'menu',
               mix: { block: 'catalogue', elem: 'navigation' },
               content: {
                   elem: 'item',
                   url: root,
                   content: '← каталог'
               }
           });

       json.push(createBemjson(ctx.tParam('decls')));

       ctx.param('content', json);
   }

});

}());
