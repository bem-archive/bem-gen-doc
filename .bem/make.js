/*global MAKE:true */

require('./nodes/arch');

var siteNodes = require('./nodes/site');


MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : ['bem-bl', 'bem-json', 'bem-pr'],

    createCustomNodes : function(common, libs) {

        var levels = ['common.blocks', 'desktop.blocks', 'test.blocks'];

        var node = new siteNodes.SiteNode({
            id   : 'site',
            arch : this.arch,
            levels : levels
        });

        this.arch.setNode(node, null, libs);

        return node.alterArch();

    }

});
