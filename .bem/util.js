/** @type Function */
var inspect = require('util').inspect;

/**
 * @type Function
 * @exports log
 * @params {*}
 */
exports.log = function() {
    /** @type Function */
    [].slice.call(arguments).forEach(function(o) {
        console.log(inspect(o, false, null));
    });
};
