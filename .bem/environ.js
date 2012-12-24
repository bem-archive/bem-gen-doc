var PATH = require('path'),

    /** @type Function */
    join = PATH.join,
    /** @type Function */
    relative = PATH.relative,
    /** @type Function */
    resolve = PATH.resolve.bind(null, __dirname),

    /**
     * Путь до корня проекта
     * @type String
     * @exports PRJ_ROOT
     */
    PRJ_ROOT = exports.PRJ_ROOT = resolve('../'),

    /**
     * Имя директории куда складываем библиотеки
     * @type String
     * @exports LIB_DIR
     */
    LIB_DIR = exports.LIB_DIR = 'lib',

    /**
     * Путь до корня хранилища библиотек
     * @type String
     * @exports LIB_ROOT
     */
    LIB_ROOT = exports.LIB_ROOT = join(PRJ_ROOT, LIB_DIR),

    /**
     * Абсолютный путь до библиотеки `lib`
     * @exports getLibPath
     * @param {String} id библиотеки
     * @returns {String}
     */
    getLibPath = exports.getLibPath = function(lib) {
        return join(LIB_ROOT, lib);
    },

    /**
     * Путь до библиотеки `lib` относительно корня проекта
     * @exports getLibRelPath
     * @param {String} id библиотеки
     * @returns {String}
     */
    getLibRelPath = exports.getLibRelPath = function(lib) {
        return relative(PRJ_ROOT, getLibPath(lib));
    };
