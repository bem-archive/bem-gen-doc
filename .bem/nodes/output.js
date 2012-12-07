var PATH = require('path'),
    BEM = require('bem'),
    URL = require('url'),
    LOGGER = require('bem/lib/logger'),
    registry = require('bem/lib/nodesregistry'),

    BemCreateNode = require('bem/lib/nodes/create').BemCreateNode,
    IntrospectNodeName = require('./introspect').IntrospectNodeName,

    Q = BEM.require('qq'),

    createLevel = BEM.createLevel,
    U = BEM.util,


    OutputNodeName = exports.OutputNodeName = 'OutputNode',
    IndexNodeName = exports.IndexNodeName = 'IndexNode',
    CatalogueItemNodeName = exports.CatalogueItemNodeName = 'CatalogueItemNode';


/**
 * Convert decl naming `elem, [block, elem]` to obj
 * @param {String} typ
 * @param {Array} args
 * @returns {Object}
 */
function declToObj(typ, args) {

    var bemobj = {},
        keys = ['block', 'mod', 'val'],
        len = args.length,
        i = 0;

    typ.indexOf('elem') === 0 && keys.splice(1, 0, 'elem');

    while( (bemobj[keys[i]] = args[i++]) && i < len );

    return bemobj;

}


registry.__defineGetter__(OutputNodeName, function() {
    return registry.getNodeClass(OutputNodeName);
});


/**
 * @namespace
 */
registry.decl(OutputNodeName, BemCreateNode, {

    __constructor : function(o) {

        this.__base.apply(this, arguments);
        this.info = o.info;

    },

    make : function() {

        var _this = this;

        return this.getMeta()
            .then(function(meta) {

                return _this.tranlateMeta(meta);

            })
            .then(function(data) {

                return _this.storeBundleData(data);

            });

    },

    getMeta : function() {
        return registry.getNodeClass(IntrospectNodeName).readMeta(this);
    },

    tranlateMeta : function() {
        // stub method
    },

    getItemTechData : function(level, item, tech) {

        return level.getTech(tech).readAllContent(level.getByObj(item, tech))
            .then(function(data) {
                return data[tech];
            });

    },

    /**
     * Сохранить результат сборки страницы
     * @param {String} [common = bundle.block] Название CommonBundle'а используемого на странице
     * @param {Object} data Данные
     * @returns
     */
    storeBundleData : function(common, data) {

        var _this = this,
            site = this.level,
            bundle = this.item,
            info = this.getBundleInfo();

        if(!data) {
            data = common;
            common = bundle.block;
        }

        return _this.getTemplates(common).spread(function(BEMJSON, BEMHTML) {

            // TODO: унести в отдельную ноду
            var prefix = site.getByObj(bundle),

                SITE_ROOT = URL.resolve(PATH.relative(prefix, this.root), PATH.relative(this.root, site.dir)),

                json = BEMJSON.build({
                        block : 'global',
                        pageTitle: info.title,
                        data: data,
                        environ: {
                            'id': 'site',
                            'name': common,
                            'site-root': SITE_ROOT
                        }
                    });

            // DEBUG:
            site.getTech('json').storeCreateResults(
                    prefix, { 'json' : JSON.stringify(json, null, '  ') }, true);

            return site.getTech('html').storeCreateResults(
                    prefix, { 'html' : BEMHTML.apply(json) }, true);

        });

    },

    getBundleInfo : function() {
        return this.info;
    },

    getTemplates : function(bundle) {

        var site = this.level,

            prefix = site.getByObj({ block: bundle }),

            bemjson = this.getBemjson(prefix),
            bemhtml = this.getBemhtml(prefix);

        return Q.all([bemjson, bemhtml]);

    },

    getOptimizedPrefix : function(prefix) {
        return PATH.join(PATH.dirname(prefix), '_' + PATH.basename(prefix));
    },

    getBemjson : function(prefix) {

        var path = this.getOptimizedPrefix(prefix) + '.bemtree.js';
        return U.readFile(path).then(function(data) {

            return ( new Function('global', 'BEM', '"use strict";' + data + ';return BEM.JSON;') )();

        });

    },

    getBemhtml : function(prefix) {

        var path = this.getOptimizedPrefix(prefix) + '.bemhtml.js';
        return Q.resolve(require(path).BEMHTML);

    }

});


exports.__defineGetter__(IndexNodeName, function() {
    return registry.getNodeClass(IndexNodeName);
});


/**
 * @namespace
 */
registry.decl(IndexNodeName, OutputNodeName, {

    tranlateMeta : function(meta) {

        var _this = this,
            /** кеш обработанных блоков */
            _cache = {},
            data = [],
            siteroot = this.level;

        /**
         * @this {Node}
         */
        function forEachLevel(item) {

            var name = item.name,
                level = createLevel(PATH.resolve(this.root, item.level.path)),
                block = _cache[name];

            if(!block) {
                // FIXME: hardcode
                var url = URL.resolve('/',
                        siteroot.getRelPathByObj({ block: this.item.block, elem: name }, 'html'));

                block = _cache[name] = { name: name, url: url };

                data.push(block);
            }

            if(!item.techs)
                return;

            block.title = this.getItemTechData(level, item, 'title.txt');
            return;

        }

        Object.keys(meta).forEach(function(name) {

            meta[name].forEach(forEachLevel, _this);

        });

        return Q.deep(data);

    }

});


exports.__defineGetter__(CatalogueItemNodeName, function() {
    return registry.getNodeClass(CatalogueItemNodeName);
});


/**
 * @namespace
 */
registry.decl(CatalogueItemNodeName, OutputNodeName, {

    tranlateMeta : function(meta) {

        var _this = this;
        return Object.keys(meta).map(function(name) {
                return _this.translateMetaLeaf(meta[name]);
            }, this);

    },

    /**
     * Процессор данных для технологий БЭМ-сущности
     * @param {Object} level
     * @param {Object} node
     * @param {String} tech
     * @param {Promise * Object} data
     * @returns {Object}
     */
    collectTechData : function(level, node, tech, data) {

        var levelPath = level.relPath;

        return Q.when(data, function(d) {

            var key,
                content = '';

            switch(tech) {

            case 'title.txt':
                key = 'title';
                content = d[tech];
                break;

            case 'desc.md':
                key = 'description';
                // TODO: move to `bemtree` & generate bemjson there from Markdown's AST
                content = marked(d[level.getTech(tech).getSuffixForLang(lang)]);
                break;

//            case 'examples':
//                key = 'examples';
//                content = collectNodeExamples(level, d[tech]);
//                break;

            }

            if(key == null)
                return node;

            var f = node[key] || (node[key] = []);

            f.push({ level: levelPath, content: content });

            return node;

        });

    },

    translateMetaLeaf : function(meta) {

        var _this = this,
            examples = {};

        /**
         * Коллектор кеша с примерами
         *
         * TODO: примеры
         *
         * @param level
         * @param path
         * @returns
         */
//        function collectNodeExamples(level, path) {
//
//            var p = PATH.relative(level.dir, path);
//            (examples[p] || (examples[p] = [])).push({ level: level, path: path });
//
//            var relative = PATH.relative.bind(null, level.dir),
//                example = createLevel(path);
//
//            return example.getItemsByIntrospection().filter(function(item) {
//                return item.tech === 'bemjson.js';
//            }).map(function(item) {
//                return relative(example.getByObj(item));
//            });
//
//        }

        /**
         * Итератор по узлам декларации
         * @param {Object[]} levels
         * @param {String} typ
         * @param {Array} args
         * @param {Object} node
         */
        function walk(levels, typ, args, node) {

            var bemobj = declToObj(typ, args);

            if(!Array.isArray(node.techs))
                return;

            levels.forEach(function(level) {

                node.techs.forEach(function(tech) {

                    tech = tech.name;
                    _this.collectTechData(level, node, _this.getItemTechData(level, bemobj, tech));

                });

            });

        }

        var root = this.root,
            decl = meta.reduce(function(d, decl) {

                U.mergeDecls(d, [decl]);

                var md = d[0];
                (md.levels || (md.levels = [])).push(decl.level);

                return d;

            }, []).pop(),

            levels = decl.levels.map(function(level) {

                var name = level.name;

                level = createLevel(PATH.resolve(root, name));
                level.relPath = name;

                return level;

            });

        // XXX
        decl.level = null;
        delete decl.level;

        U.declForEach(decl, walk.bind(this, levels));

        return Q.deep(decl);
    }

});

