/*global MAKE:true */

require('../../.bem/nodes/arch');

var PATH = require('path'),
    environ = require('../../.bem/environ'),
    siteNodes = require('../../.bem/nodes/site');

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

//    libraries : ['bem-bl', 'bem-json', 'bem-pr'],

    createCustomNodes : function(common, libs) {

        /**
         * A set of levels to build site from
         * @type Array
         */
        var levels = ['../common.blocks', 'desktop.blocks', 'test.blocks'];

        return new siteNodes.SiteNode({
                id   : 'site',
                arch : this.arch,
                levels : levels
            })
            .alterArch(null, libs);

    }

});

MAKE.decl('MachineExampleNode', {

    /**
     * FIXME: hardcode
     * @returns {Array}
     */
    getLevels : function() {

        var levels = [
                 'bem-bl/blocks-common',
                 'bem-bl/blocks-desktop'
             ]
            .map(PATH.join.bind(null, environ.LIB_ROOT));


        levels.push(PATH.resolve(environ.PRJ_ROOT, 'common.blocks'));

        levels.push([
            'desktop.blocks',
            'test.blocks'
        ].map(PATH.resolve.bind(this.root)));

        levels.push(PATH.resolve(this.root, PATH.dirname(this.getNodePrefix()), 'blocks'));

        return levels;

    }

});
