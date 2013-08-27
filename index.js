'use strict';

var PATH = require('path');

// must be executed after bem-pr's extendMake()
exports.extendMake = function(registry) {
    require('./.bem/nodes')(registry);
};

exports.require = require;
exports.resolve = PATH.resolve.bind(PATH, __dirname);
