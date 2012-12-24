/**
 * @module nodes/output
 */

var PATH = require('path'),
    BEM = require('bem'),
    URL = require('url'),
    LOGGER = require('bem/lib/logger'),
    registry = require('bem/lib/nodesregistry'),

    SHMAKOWIKI = require('shmakowiki'),

    BemCreateNode = require('bem/lib/nodes/create').BemCreateNode,
    IntrospectNodeName = require('./introspect').IntrospectNodeName,

    Q = BEM.require('qq'),

    createLevel = BEM.createLevel,
    U = BEM.util,

    OutputNodeName = exports.OutputNodeName = 'OutputNode',
    IndexNodeName = exports.IndexNodeName = 'IndexNode',
    CatalogueItemNodeName = exports.CatalogueItemNodeName = 'CatalogueItemNode';


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


/** @exports OutputNode */
Object.defineProperty(exports, OutputNodeName, {
    'get' : function() {
        return registry.getNodeClass(OutputNodeName);
    }
});


/**
 * @namespace
 */
registry.decl(OutputNodeName, BemCreateNode, {

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

        return this.tranlateMeta(meta)
            .then(function(data) {
                return _this.storeDataBundle(path, data);
            })
            .then(function(data) {
                return _this.storeResultBundle(_this.item);
            });

    },

    getMeta : function() {
        return registry.getNodeClass(IntrospectNodeName).readMeta(this);
    },

    tranlateMeta : function() {
        // stub method
    },

    storeDataBundle : function(path, data) {

        U.mkdirp(PATH.dirname(path));
        return U.writeFileIfDiffers(path, JSON.stringify(data, null, '  '))
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
     * @returns
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
     * @returns
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

    'get-examples-data' : function(prefix, tech) {

        // FIXME: hardcode
        var _this = this,
            exampleLevel = createLevel(tech.getPath(prefix)),
            outLevel = createLevel(PATH.join(this.level.dir, 'examples')),
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

    },


});


/** @examples IndexNode */
Object.defineProperty(exports, IndexNodeName, {
    'get' : function() {
        return registry.getNodeClass(IndexNodeName);
    }
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
                var url = URL.resolve(
                        '/', siteroot.getRelPathByObj({ block: 'catalogue', elem: name }, 'html'));

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


/** @examples CatalogueItemNode */
Object.defineProperty(exports, CatalogueItemNodeName, {
    'get' : function() {
        return registry.getNodeClass(CatalogueItemNodeName);
    }
});


/**
 * @namespace
 */
registry.decl(CatalogueItemNodeName, OutputNodeName, {

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
//                .then(function(data) {
//                    _this.createBundleExamples(data);
//                    return data;
//                })
                .then(function(data) {
                    // сохраняем `html`
                    return _this.storeResultBundle(item);
                });

        }));

    },

    // TODO
    /*
    createBundleExamples : function(data) {

        function forEachItem(data) {

            if(Array.isArray(data)) {
                data.forEach(function(item) {
                    return forEachItem(item);
                });
                return;
            } else if(data == null) {
                return;
            }

            Object.keys(data).forEach(function(key) {

                if(~['elem', 'mods', 'vals'].indexOf(key)) {
                    forEachItem(data[key]);
                }

                if(key === 'examples')
                    console.log('111', data[key]);

            });

        }

        return forEachItem(data);

    },
    */

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

            switch(tech) {

            case 'title.txt':
                key = 'title';
                content = d;
                break;

            case 'desc.md':
                key = 'description';
                // TODO: move to `bemtree` & generate bemjson there from Markdown's AST
                //content = marked(d[level.getTech(tech).getSuffixForLang(lang)]);
                break;

            case 'desc.wiki':
                key = 'description';
                // TODO: move to node
                content = SHMAKOWIKI.shmakowikiToHtml(d);
                break;

            case 'examples':
                key = 'examples';
                content = d;
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

        var _this = this;

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
                    _this.collectTechData(level, node, tech, _this.getItemTechData(level, bemobj, tech));

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

        return Q.deep(decl);
    }

});

