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

    getLibraries : function() {

        return {
            'lib/bem-bl' : {
                type        : 'git',
                url         : 'git://github.com/bem/bem-bl.git',
                treeish     : '0.3'
            },
            'lib/bem-html' : {
                type        : 'git',
                url         : 'git://github.com/bem/bl-core-bemhtml.git'
            },
            'lib/bem-json' : {
                type        : 'git',
                url         : 'git://github.com/delfrrr/bem-json.git',
                npmPackages : false
            }
        };

    },

    createCustomNodes : function(common, libs, blocks, bundles) {

        var site = new (MAKE.getNodeClass('InstrospectNode'))({
                id : SITE_NODE_ID,
                root : this.root
            });

        // XXX: unhardcodeme
        this.arch.setNode(site).addParents('site.bundles*', site);

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

        var ctx = _this.createCtx(decls)
            .then(function(ctx) {

                // TODO: унести в отдельную (MagicNode?) ноду
                var bundles = BEM.createLevel(prj.getRelPathByObj({ 'block' : SITE_BUNDLES }, 'bundles')),
                    prefix = bundles.getByObj({ 'block' : 'index' }),

                    json = _this.getBemjson(prefix)
                        .then(function(BEMJSON) {

                            return BEMJSON.build({
                                block: 'global',
                                pageTitle: 'My page',
                                pageName: 'index',
                                decls: ctx
                            });

                        }),
                    bemhtml = _this.getBemhtml(prefix);

                Q.all([bemhtml, json]).spread(function(bemhtml, json) {

                    bundles.getTech('html').storeCreateResults(prefix, { 'html' : bemhtml.apply(json) }, true);

                });

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

    getOptimizedPrefix : function(prefix) {
        return PATH.join(PATH.dirname(prefix), '_' + PATH.basename(prefix));
    },

    getBemjson : function(prefix) {

        var path = this.getOptimizedPrefix(prefix) + '.bemtree.js';
        return U.readFile(path).then(function(data) {
            return ( new Function('global', '"use strict";' + data + ';return BEM.JSON;') )();
        });

    },

    getBemhtml : function(prefix) {

        var path = this.getOptimizedPrefix(prefix) + '.bemhtml.js';
        return Q.resolve(require(path).BEMHTML);

    }

}, /** @lends Instrospect */{

    createId : function(opt) {

        return opt.id;

    }

});


MAKE.decl('BundleNode', {

    getTechs : function() {

        return [
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'bemtree.js',
            'css',
            'js'
        ];

    },

    getLevels : function() {

        return [
                'lib/bem-html/common.blocks',
                'common.blocks',
                'site.blocks'
            ].map(function(path) {
                return PATH.resolve(this.root, path);
            }, this);

    },

    'create-bemtree.js-node' : function(tech, bundleNode, magicNode) {
        return this.createDefaultTechNode.apply(this, arguments);
    },

    'create-bemtree.js-optimizer-node' : function() {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});

