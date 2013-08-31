'use strict';

var PATH = require('path'),
    FS = require('fs'),
    URL = require('url'),
    BEM = require('bem'),

    SHMAKOWIKI = require('shmakowiki'),
    MD = require('marked')
        .setOptions({
            gfm : true,
            pedantic : false,
            sanitize : false
        }),

    Q = BEM.require('qq'),
    QFS = BEM.require('q-fs'),

    createLevel = BEM.createLevel,
    U = BEM.util;

module.exports = function(registry) {

    /**
     * @namespace
     */
    registry.decl('OutputNode', 'BemCreateNode', {

        __constructor : function(o) {

            this._level = o.level;
            this.__base.apply(this, arguments);

        },

        isValid : function() {
            return Q.resolve(0);
        },

        make : function() {

            var _this = this;

            // FIXME: hack
            this.level = createLevel(PATH.resolve(this.root, this._level));

            return this.getMeta()
                .then(function(meta) {
                    return _this.createBundle(meta);
                });

        },

        createBundle : function(meta) {

            var _this = this,
                level = this.level,
                path = this.tech.getPath(level.getByObj(this.item));

            return this.translateMeta(meta)
                .then(function(data) {
                    return _this.storeDataBundle(path, data);
                })
                .then(function(data) {
                    return _this.storeResultBundle(_this.item);
                });

        },

        getMeta : function() {
            return registry.getNodeClass('IntrospectNode').readMeta(this);
        },

        translateMeta : function() {
            // stub method
        },

        storeDataBundle : function(path, data) {

            return QFS.makeTree(PATH.dirname(path))
                .then(function() {
                    return U.writeFileIfDiffers(path, JSON.stringify(data, null, 2))
                })
                .then(function() {
                    return data;
                });

        },

        /**
         * Сохранить результат сборки страницы
         *
         * TODO: унести в технологию
         *
         * @param {Object} item
         * @returns {Promise}
         */
        storeResultBundle : function(item) {

            var _this = this,
                level = this.level,
                // FIXME: при холодном старте `level.getTech` не найдет технологию из уровня
                tech = level.getTech('html'),
                prefix = level.getByObj(item);

            return this.getDataCtx(prefix)
                .then(function(data) {

                    return _this.getResource(_this.item)
                        .spread(function(BEMJSON, BEMHTML) {

                            // TODO: унести в отдельную ноду
                            var bundlePrefix = level.getByObj(_this.item),
                                SITE_ROOT = URL.resolve(
                                    PATH.relative(bundlePrefix, _this.root), PATH.relative(_this.root, level.dir)),

                                json = BEMJSON.build({
                                        block : 'global',
                                        pageTitle: _this.item.block,
                                        data: data,
                                        environ: {
                                            'id': 'site',
                                            'name': _this.item.block,
                                            'site-root': SITE_ROOT
                                        }
                                    });

                            return U.writeFile(tech.getPath(prefix), BEMHTML.apply(json));

                        });

                });

        },

        getResource : function(item) {

            var site = this.level,

                prefix = site.getByObj(item),

                bemjson = this.getBemjson(prefix),
                bemhtml = this.getBemhtml(prefix);

            return Q.all([bemjson, bemhtml]);

        },

        getOptimizedPrefix : function(prefix) {
            return PATH.join(PATH.dirname(prefix), '_' + PATH.basename(prefix));
        },

        getBemjson : function(prefix) {

            var path = this.getOptimizedPrefix(prefix) + '.bemjson.js';
            return U.readFile(path)
                .then(function(data) {
                    return ( new Function('global', 'BEM', '"use strict";' + data + ';return BEM.JSON;') )();
                });

        },

        getBemhtml : function(prefix) {

            var path = this.getOptimizedPrefix(prefix) + '.bemhtml.js';
            return Q.resolve(require(path).BEMHTML);

        },

        getDataCtx : function(prefix) {

            var path = prefix + '.data.json';
            return U.readFile(path)
                .then(function(data) {
                    return JSON.parse(data);
                });

        },

        /**
         * @param {Object} level
         * @param {Object} item
         * @param {String} tech
         * @returns {*}
         */
        getItemTechData : function(level, item, tech) {

            var prefix = level.getByObj(item, tech),
                tobj = level.getTech(tech),
                /** {Function} */
                getTechDataFn = ['get', tech, 'data'].join('-');

            if(typeof this[getTechDataFn] !== 'function')
                return null;

            return this[getTechDataFn](prefix, tobj);

        },

        'get-tech-data' : function(prefix, tech) {

            return tech.readAllContent(prefix)
                .then(function(data) {
                    // FIXME: hardcode :(
                    return data[tech.getSuffixes()[0]];
                });

        },

        'get-title.txt-data' : function(prefix, tech) {
            return this['get-tech-data'].apply(this, arguments);
        },

        'get-desc.md-data' : function(prefix, tech) {
            return this['get-tech-data'].apply(this, arguments);
        },

        'get-desc.wiki-data' : function(prefix, tech) {
            return this['get-tech-data'].apply(this, arguments);
        },

        'get-i18n.title.txt-data' : function(prefix, tech) {
            return this['get-title.txt-data'].apply(this, arguments);
        },

        'get-i18n.desc.md-data' : function(prefix, tech) {
            return this['get-desc.md-data'].apply(this, arguments);
        },

        'get-i18n.desc.wiki-data' : function(prefix, tech) {
            return this['get-desc.wiki-data'].apply(this, arguments);
        },

        'get-thumb.png-data' : function(prefix, tech) {
            var path = tech.getPath(prefix);

            if(!FS.existsSync(path))
                return;

            return path;
        },

        'get-examples-data' : function(prefix, tech) {

            // FIXME: hardcode
            var _this = this,
                path = tech.getPath(prefix);

            if(!FS.existsSync(path))
                return;

            var exampleLevel = createLevel(path),
                outLevel = createLevel(this.level.getPathByObj({ block : 'example' }, 'sets')),
                cache = {};

            exampleLevel.getItemsByIntrospection()
                .forEach(function(item) {

                    var key = U.bemKey(item),
                        source = (cache[key] || (cache[key] = {}));

                    switch(item.tech) {

                    case 'title.txt':
                        source.title = _this.getItemTechData(exampleLevel, item, item.tech);
                        return;

                    case 'bemjson.js':
                        var level = createLevel(PATH.join(outLevel.dir,
                                PATH.basename(prefix) + '.examples')),
                            path = level.getByObj(item);
                        source.url = PATH.relative(outLevel.dir, path);
                        return;

                    }

                });

            return Q.all(Object.keys(cache).map(function(key) {

                return Q.shallow(cache[key], function(item) {
                    return item;
                });

            }));

        }

    });

    /**
     * @namespace
     */
    registry.decl('IndexNode', 'OutputNode', {

        translateMeta : function(meta) {

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
                    var url = URL.resolve(
                            '/', siteroot.getRelPathByObj({ block: 'catalogue', elem: name }, 'html'));

                    block = _cache[name] = { name: name, url: url };

                    data.push(block);
                }

                if(!item.techs) return;

                block.title = this.getItemTechData(level, item, 'title.txt');

            }

            Object.keys(meta).forEach(function(name) {
                meta[name].forEach(forEachLevel, _this);
            });

            return Q.deep(data);

        }

    });

    /**
     * @namespace
     */
    registry.decl('CatalogueItemNode', 'OutputNode', {

        createBundle : function(meta) {

            var _this = this,
                level = this.level;

            return Q.all(Object.keys(meta).map(function(name) {

                var item = {
                        block : _this.item.block,
                        elem : name
                    },
                    path;

                path = _this.tech.getPath(level.getByObj(item));

                return _this.translateMeta(meta[name])
                    .then(function(data) {
                        // сохраняем `data.json`
                        return _this.storeDataBundle(path, data);
                    })
                    .then(function(data) {
                        // сохраняем `html`
                        return _this.storeResultBundle(item);
                    });

            }));

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

            if(!data)
                return node;

            var _this = this,
                levelPath = level.relPath;

            return Q.when(data, function(d) {

                var key,
                    content = '';

                if(d == null)
                    return;

                switch(tech) {

                case 'title.txt':
                case 'i18n.title.txt':
                    key = 'title';
                    content = d;
                    break;

                case 'desc.md':
                case 'i18n.desc.md':
                    key = 'description';
                    // TODO: move to `bemtree` & generate bemjson there from Markdown's AST
                    content = MD(d);
                    break;

                case 'desc.wiki':
                case 'i18n.desc.wiki':
                    key = 'description';
                    // TODO: move to node
                    content = SHMAKOWIKI.shmakowikiToBemjson(d);
                    break;

                case 'examples':
                    key = 'examples';
                    content = d;
                    break;

                case 'thumb.png':
                case 'thumb.jpg':
                    key = 'thumb';
                    content = PATH.relative(level.dir, d);
                    break;

                }

                if(key == null)
                    return node;

                var f = node[key] || (node[key] = []);

                f.push({ level: levelPath, content: content });

                return node;

            });

        },

        translateMeta : function(meta) {

            var _this = this,
                defers = [];

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
                        var data = _this.getItemTechData(level, bemobj, tech.name);
                        defers.push(data);

                        _this.collectTechData(level, node, tech.name, data);
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

                    var name = level.path;

                    level = createLevel(PATH.resolve(root, name));
                    level.relPath = name;

                    return level;

                });

            // XXX
            decl.level = null;
            delete decl.level;

            U.declForEach(decl, walk.bind(this, levels));

            return Q.all(defers).then(function() { return decl });
        }

    });

};

/**
 * Convert decl naming `elem, [block, elem]` to BEM-obj
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
