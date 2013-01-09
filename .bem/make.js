/*global MAKE:true */

var PATH = require('path'),
    LOGGER = require('bem/lib/logger'),

    environ = require('./environ'),

    siteNodes = require('./nodes/site'),
    examplesNodes = require('./nodes/examples'),

    SITE_NODE_ID = 'site';

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks$/,

    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : ['bem-bl', 'bem-html', 'bem-json'],

    createCustomNodes : function(common, libs, blocks, bundles) {

        var levels = ['common.blocks', 'desktop.blocks', 'test.blocks'];

        var node = new siteNodes.SiteNode({
            id : SITE_NODE_ID,
            arch : this.arch,
            levels : levels
        });

        this.arch.setNode(node);

        return node.alterArch();

    }

});
