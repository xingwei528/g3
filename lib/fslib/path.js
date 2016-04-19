"use strict";
var path = require('path');
var _ = require('lodash');
function pathRelative(from, to) {
    return '/' + _.trim(path.relative(from, to).toLowerCase().replace(/\\/g, '/'), '/');
}
exports.pathRelative = pathRelative;
function pathParent(key) {
    return pathJoin(key, '..');
}
exports.pathParent = pathParent;
function pathJoin() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i - 0] = arguments[_i];
    }
    return '/' + _.trim(path.join.apply(path, paths).toLowerCase().replace(/\\/g, '/'), '/');
}
exports.pathJoin = pathJoin;
//# sourceMappingURL=path.js.map