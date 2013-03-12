/**
 * @module nodes/introspect
 */

var PATH = require('path'),
    BEM = require('bem'),
    LOGGER = require('bem/lib/logger'),
    VM = require('vm'),
    registry = require('bem/lib/nodesregistry'),

    Q = BEM.require('qq'),
    QFS = BEM.require('q-fs'),

    createLevel = BEM.createLevel,
    U = BEM.util,

    IntrospectNodeName = exports.IntrospectNodeName = 'IntrospectNode';


/** @exports IntrospectNode */
Object.defineProperty(exports, IntrospectNodeName, {
    'get' : function() {
        return registry.getNodeClass(IntrospectNodeName);
    }
});


/**
 * @namespace
 */
registry.decl(IntrospectNodeName, 'Node', {

    /**
     * @constructor
     */
    __constructor : function(o) {

        this.__base.apply(this, arguments);

        this.root = o.root;
        /** @type String[] */
        this.paths = o.paths;
        /** @type String[] */
        this.langs = o.langs;

    },

    make : function() {

        var _this = this;
        return this.getStruct()
            .then(function(struct) {
                return _this.writeMeta(struct);
            });

    },

    getStruct : function() {

        var decls = this.paths.reduce(function(decls, level) {

            createLevel(level).getDeclByIntrospection().forEach(function(decl) {

                var name = decl.name;

                decl.level = { path: level };
                (decls[name] || (decls[name] = [])).push(decl);

            });

            return decls;

        }, {});

        return Q.shallow(decls);

    },

    getMetaPath : function() {
        return this.__self.getMetaPath(this);
    },

    readMeta : function() {
        return this.__self.readMeta(this);
    },

    writeMeta : function(meta) {
        return this.__self.writeMeta(this, meta);
    }

}, {

    createId : function(o) {
        return 'machine-introspect*';
    },

    getMetaPath : function(o) {

        // FIXME: hardcode
        var metaPath = PATH.join('.bem', 'cache', 'introspector.meta.js');
        return PATH.resolve(o.root, metaPath);

    },

    readMeta : function(o) {

        var path = this.getMetaPath(o);

        return U.readFile(path)
            .then(function(data) {
                return VM.runInThisContext(data);
            })
            .fail(function() {
                return null;
            });

    },

    writeMeta : function(o, meta) {

        var path = this.getMetaPath(o);

        U.mkdirs(PATH.dirname(path));
        return QFS.write(path, '(' + JSON.stringify(meta, null, 2) + ')');

    }


});
