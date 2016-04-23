"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
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
function listSync(dirpath) {
    var dirnames = [];
    var filenames = [];
    var arr = fse.readdirSync(dirpath) || [];
    arr.forEach(function (name) {
        var p = path.join(dirpath, name);
        if (fse.statSync(p).isDirectory()) {
            dirnames.push(name);
        }
        else {
            filenames.push(name);
        }
    });
    return {
        dirnames: dirnames,
        filenames: filenames
    };
}
exports.listSync = listSync;
function getPrefix() {
    var prefix;
    if (process && process.platform === 'win32') {
        prefix = process.env.APPDATA
            ? path.join(process.env.APPDATA, 'npm')
            : path.dirname(process.execPath);
    }
    else {
        prefix = path.dirname(path.dirname(process.execPath));
        if (process.env.DESTDIR) {
            prefix = path.join(process.env.DESTDIR, prefix);
        }
    }
    return prefix;
}
exports.getPrefix = getPrefix;
//# sourceMappingURL=index.js.map