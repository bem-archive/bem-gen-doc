'use strict';

var PATH = require('path'),
    BEM = require('bem'),
    VM = require('vm'),
    Q = BEM.require('qq'),
    QFS = BEM.require('q-fs'),
    U = BEM.util;

module.exports = function(registry) {

    /**
     * @namespace
     */
    registry.decl('IntrospectNode', 'Node', {

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

            var root = this.root,
                decls = this.paths.reduce(function(decls, level) {

                    var levelPath = PATH.resolve(root, level);

                    BEM.createLevel(levelPath)
                        .getDeclByIntrospection()
                        .forEach(function(decl) {

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
            return PATH.resolve(o.root, '.bem/cache/introspector.meta.js');
        },

        readMeta : function(o) {
            var path = this.getMetaPath(o);

            // FIXME: replace with bem util function
            return U.readFile(path)
                .then(function(data) {
                    return data ? VM.runInThisContext(data) : {};
                })
                .fail(function() {
                    return {};
                });
        },

        writeMeta : function(o, meta) {
            var path = this.getMetaPath(o);

            U.mkdirs(PATH.dirname(path));
            return QFS.write(path, '(' + JSON.stringify(meta, null, 2) + ')');
        }

    });

};
