/*global MAKE:true */

"use strict";

var PATH = require('path'),
    BEM = require('bem'),
    Q = BEM.require('qq'),

    U = BEM.util,

    INSTROSPECT_NODE_ID = 'introspect',
    SITE_NODE_ID = 'site',

    EXPORT_LEVELS = ['common', 'desktop'],

    SITE_BUNDLES = 'site';


MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

//    getLibraries : function() {
//
//        return {
//            'bem-bl' : {
//                type        : 'git',
//                url         : 'git://github.com/bem/bem-bl.git',
//                treeish     : '0.3',
//                npmPackages : false
//            }
//        }
//
//    },

    createCustomNodes : function(common, libs, blocks, bundles) {

        var site = new (MAKE.getNodeClass('InstrospectNode'))({
                id : SITE_NODE_ID,
                root : this.root
            });

        this.arch.setNode(site, libs);

        return site.getId();

    }

});


/**
 * @name Instrospect
 */
MAKE.decl('InstrospectNode', 'Node', /** @lends Instrospect.prototype */{

    /**
     * @constructor
     */
    __constructor : function(opt) {

        this.__base.apply(this, arguments);
        this.root = opt.root;
    },

    make : function() {

        this.createPrjStruct();

    },

    createPrjStruct : function() {

        var _this = this,
            prj = BEM.createLevel(this.root),
            levels = prj.getItemsByIntrospection().filter(function(item) {
                return item.tech === 'blocks' && ~EXPORT_LEVELS.indexOf(item.block);
            }),
            decls = [];

        levels.forEach(function(level) {
            U.mergeDecls(decls,
                BEM.createLevel(prj.getRelPathByObj(level, level.tech)).getDeclByIntrospection());
        });

        var ctx = _this.createCtx(decls);
        ctx.then(function(ctx) {

            prj.getTech('bundles').createByDecl({ block : SITE_BUNDLES }, prj, { force : false });

            var bemjson = createBemjson(ctx),
                bundles = BEM.createLevel(prj.getRelPathByObj({ 'block' : SITE_BUNDLES }, 'bundles')),
                prefix = bundles.getByObj({ 'block' : 'index' }),

                page = _this.getPageBemjson();

            // XXX
            page.content.content = bemjson;

            return bundles.getTech('bemjson.js').storeCreateResults(prefix,
                    { 'bemjson.js' : '(' + JSON.stringify(page, null, 4) + ')\n' }, true);

        })
        .end();

    },

    createCtx : function(decl) {

        var _this = this;

        decl.forEach(function(obj) {
            U.declForEach(obj, function(type, args, item) {

                var bemEntity = {
                        'block' : args[0]
                    };

                if(args.length > 1) {
                    var fields = ['mod', 'mod-val'],
                        i = 0;

                    type.indexOf('elem') === 0 && (fields = ['elem'].concat(fields));

                    while((bemEntity[fields[i]] = args[++i]) && i < args.length - 1);
                }

                var sep = '-',
                    data;

                if(!item.techs)
                    return;

                item.techs.forEach(function(tech) {

                    var name = tech.name,
                        techDataProc = ['get', name, 'data'].join(sep),

                        data = typeof this[techDataProc] === 'function' ?
                                this[techDataProc](bemEntity, name) : {};

                    Q.when(data, function(data) {
                        U.extend(item, data);
                    });

                }, _this);

            });
        });

        return Q.deep(decl);

    },

    'get-tech-data' : function(item, tech) {

        // XXX
        var level = BEM.createLevel(PATH.resolve(this.root, 'common.blocks')),
            prefix = level.getByObj(item, tech),

            techObj = level.getTech(tech);

        return techObj.readAllContent(prefix).then(function(data) {
            return data;
        });

    },

    'get-title.txt-data' : function(item, tech) {

        return this['get-tech-data'].apply(this, arguments).then(function(data) {
            return { title : data[tech] };
        });

    },

    'get-desc.txt-data' : function(item, tech) {

        return this['get-tech-data'].apply(this, arguments).then(function(data) {
            return { desc : data[tech] };
        });

    },

    getPageBemjson : function() {

        return {
            block : 'page',
            title : '',
            assets : [
                { elem: 'css', url: '_index.css' },
                { elem: 'js', url: '_index.js' }
            ],
            content : {
                block : 'catalogue',
                content : []
            }
        }
    }

}, /** @lends Instrospect */{

    createId : function(opt) {

        return opt.id;

    }

});


MAKE.decl('BundleNode', {

    getTechs : function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'html',
            'css',
            'js'
        ];

    },

    getLevels : function() {

        return [
                'bem-bl/blocks-common',
                'bem-bl/blocks-desktop',
                'common.blocks',
                'site.blocks'
            ].map(function(path) {
                return PATH.resolve(this.root, path);
            }, this);

    }

});


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
    obj.description = ctx.desc || [];

    var content = obj.content || (obj.content = []);

    var mods = createBemjson(ctx.mods, 'mod');
    mods && [].push.apply(content, mods);

    var vals = createBemjson(ctx.vals, 'mod-val');
    vals && [].push.apply(content, vals);

    var elems = createBemjson(ctx.elems, 'elem');
    elems && [].push.apply(content, elems);

    return obj

}


