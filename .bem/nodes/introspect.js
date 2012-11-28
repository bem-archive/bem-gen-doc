var PATH = require('path'),
    FS = require('fs'),
    BEM = require('bem'),
    Q = BEM.require('qq'),
    MARKED = require('marked').setOptions({
        gfm : true,
        pedantic : true,
        sanitize : true
    }),
    registry = BEM.require('./nodesregistry'),
    
    createLevel = BEM.createLevel,
    U = BEM.util,
    
    IntrospectNodeName = exports.IntrospectNodeName = 'IntrospectNode';


function inspect(s) {
    console.log(require('sys').inspect(s, null, 9)); 
}

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


exports.__defineGetter__(IntrospectNodeName, function() {
    return registry.getNodeClass(IntrospectNodeName);
});

registry.decl(IntrospectNodeName, 'Node', /** @lends Instrospect.prototype */{

    /**
     * @constructor
     */
    __constructor : function(opt) {

        this.__base.apply(this, arguments);
        
        this.root = opt.root;
        
        this.levels = opt.exportLevels;
        this.langs = opt.langs;
        
        this.path = createLevel(this.__self.createId(opt));
        
    },

    make : function() {

        var _this = this;
        
        this.getPrjStruct()
            .then(function(decls) {
                
                return Q.all[_this.langs.map(function(lang) {
                    return _this.createSiteNodes(decls, lang);
                })];
                
            })
            .end();
        
    },
    
    getPrjStruct : function() {

        var _this = this,
            root = createLevel(this.root),
            levels = root.getItemsByIntrospection().filter(function(item) {
                return item.tech === 'blocks' && ~_this.levels.indexOf(item.block);
            }),
            // {Object[]} описание экспортируемых уровней
            decls = levels.reduce(function(decls, levelObj) {
                
                    var level = root.getRelPathByObj(levelObj, levelObj.tech);
                    createLevel(level).getDeclByIntrospection().forEach(function(decl) {
                        
                        var name = decl.name;
                        
                        decl.level = { name: level };
                        (decls[name] || (decls[name] = [])).push(decl);
                        
                    });
                    
                    return decls;
                    
                }, {});
            
        return Q.shallow(decls);

    },

    createSiteNodes : function(decl, lang) {

        var nodes = [this.createIndexNode(decl, lang)];
        
        Object.keys(decl).forEach(function(name) {
            nodes.push(this.createInnerNode(decl[name], lang));
        }, this);
        
        // KILLME
        // Inner page testing for `b-form-input` block
//        nodes.push(this.createInnerNode(decl['b-form-button'], lang));
        
        return Q.all(nodes);

    },
    
    
    createIndexNode : function(decl, lang) {
        
        var _this = this,
            blocksCache = {},
            data = [],
            site = this.path;
        
        /**
         * @this {Node}
         */
        function forEachLevel(item) {
            
            var name = item.name,
                level = createLevel(PATH.resolve(this.root, item.level.name)),
                block = blocksCache[name]; 
            
            if(!block) {
                // XXX: UNHARDCODEME
                var url = [
                        '/site.bundles', 
                        site.getRelPathByObj({ block: 'catalogue', elem: name }, 'html')
                    ].join('/');
                
                block = blocksCache[name] = { name: name, url: url };
                
                data.push(block);
            }
            
            if(!item.techs)
                return;
                
            var title = item.techs.filter(function(t) { return t.name === 'title.txt'; });
            
            if(title.length)
                block.title = title.map(function(t) {
                    
                    // TODO: локализация технологий 
                    var tech = t.name;
                    return level
                        .getTech(tech)
                        .readAllContent(level.getByObj({ block: name }, tech)).then(function(data) {
                            return data[tech];
                        });
                    
                });
            
        }
        
        Object.keys(decl).forEach(function(name) {
            
            decl[name].forEach(forEachLevel, _this);
            
        });
        
        return Q.deep(data)
            .then(this.storeBundleData.bind(this, 
                    { block : 'index' }, { title : 'Библиотека блоков', lang : lang }));
        
    },
    
    createInnerNode : function(decls, lang) {
        
        var _this = this,
            relativize = PATH.relative.bind(null, this.root);
       
        /**
         * @param {Object} level
         * @param {Object} node
         * @param {String} tech
         * @param {Promise * Object} data
         * @returns {Object}
         */
        function collectNodeData(level, node, tech, data) {
            
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
                    content = MARKED(d[level.getTech(tech).getSuffixForLang(lang)]);
                    break;
                    
                case 'examples':
                    key = 'examples';
                    content = relativize(d[tech]);
                    break;
                
                }
                
                if(key == null)
                    return node;
                
                var f = node[key] || (node[key] = []);
                
                f.push({ level: levelPath, content: content });
                
                return node;
                
            });
            
        }
        
        /**
         * Итератор по узлам декларации
         * @param {Object[]} levels
         * @param {String} typ
         * @param {Array} args
         * @param {Object} node
         */ 
        function walk(levels, typ, args, node) {
            
            var bemobj = declToObj(typ, args);
            
            if(!node.techs || !node.techs.length)
                return;
            
            levels.forEach(function(level) {
                
                var prefix = level.getByObj(bemobj);
                
                node.techs.forEach(function(tech) {
                    
                    var id = tech.name,
                        dataProc = _this.getTechProcFnName(id);
                    
                    if(typeof _this[dataProc] === 'function') {
                        
                        // XXX: результат `getTech` кешируется в объекте уровня (?) 
                        var techobj = level.getTech(id);
                        
                        // TODO
//                        FS.existsSync(level.getPath(prefix, id)) && 
                        collectNodeData(level, node, id, _this[dataProc](prefix, techobj)).end();
                        
                    }
                    
                });
                
            });
            
        }
        
        var root = this.root,
            decl = decls.reduce(function(d, decl) {
                
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
        
        return Q.deep(decl)
            .then(function(decl) {
                
                var block = 'catalogue',
                    name = decl.name;

                return _this.storeBundleData({ block : block, elem : name }, 
                        block, { title : name, lang : lang }, decl);
                
            });
        
    },
    
    getTechProcFnName : function(tech) {
        
        return ['get', tech, 'data'].join('-');
        
    },

    'get-tech-data' : function(prefix, tech, item) {

        return tech.readAllContent(prefix);

    },

    'get-title.txt-data' : function(prefix, tech) {

        return this['get-tech-data'].apply(this, arguments);

    },

    'get-desc.md-data' : function(prefix, tech) {

        return this['get-tech-data'].apply(this, arguments);

    },
    
    'get-examples-data' : function(prefix, tech) {
        
        return { 'examples' : tech.getPath(prefix) };
        
    },
    
    /**
     * Сохранить результат сборки страницы
     * @param {Object} bundle БЭМ-объект бандла
     * @param {String} [common = bundle.block] Название budle'а используемого на странице
     * @param {Object} meta Информация о странице
     * @param {String} meta.title Заголовок страницы 
     * @param data Данные
     * @returns
     */
    storeBundleData : function(bundle, common, meta, data) {
        
        var _this = this,
            site = this.path;
        
        if(!data) {
            data = meta;
            meta = common;
            common = bundle.block;
        }
        
        return _this.getTemplates(common).spread(function(BEMJSON, BEMHTML) {
        
            // TODO: унести в отдельную ноду
            var prefix = site.getByObj(bundle),
                json = BEMJSON.build({
                        block: 'global',
                        pageTitle: meta.title,
                        pageName: common,
                        data: data
                    });

            // DEBUG:
//            return site.getTech('json').storeCreateResults(
//                    prefix, { 'json' : JSON.stringify(json, null, '  ') }, true);
            return site.getTech('html').storeCreateResults(
                    prefix, { 'html' : BEMHTML.apply(json) }, true);

        });
        
    },
    
    getTemplates : function(bundle) {
        
        var site = this.path,
            
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

}, /** @lends Instrospect */{

    createId : function(o) {
        
        return createLevel(o.root)
            .createTech('bundles')
            .getPath(o.siteBundleName);
        
    }

});
