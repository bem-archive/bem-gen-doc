/*global MAKE:true */

require('./nodes/arch');

try {
    var siteNodes = require('./nodes/site');
} catch(e) {
    if(e.code !== 'MODULE_NOT_FOUND')
        throw e;

    siteNodes = false;
}


MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : ['bem-bl', 'bem-json', 'bem-pr'],

    createCustomNodes : function(common, libs, blocks, bundles) {

        if(siteNodes === false)
            return;

        var levels = ['common.blocks', 'desktop.blocks', 'test.blocks'];

        var node = new siteNodes.SiteNode({
            id   : 'site',
            arch : this.arch,
            levels : levels
        });

        this.arch.setNode(node);

        libs && this.arch.addChildren(node, libs);

        return node.alterArch();

    }

});
