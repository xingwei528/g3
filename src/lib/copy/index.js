"use strict";
var path = require('path');
var fse = require('fs-extra');
function copySync(src, dest) {
    fse.copySync(src, dest);
}
exports.copySync = copySync;
function copy(src, dest, callback) {
    fse.copy(src, dest, callback);
}
exports.copy = copy;
function copyAppFiles(g3Config) {
    g3Config._files.forEach(function (file) {
        var filePath = path.join(g3Config._appPath, file);
        if (file[0] === '.'
            || file === 'g3.json'
            || file === 'package.json')
            return;
        copySync(filePath, path.join(g3Config.destination, file));
    });
    g3Config._directories.forEach(function (dir) {
        var dirPath = path.join(g3Config._appPath, dir);
        if (dir[0] === '.'
            || dir === 'node_modules'
            || dirPath === g3Config.source
            || dirPath === g3Config.destination)
            return;
        copySync(dirPath, path.join(g3Config.destination, dir));
    });
}
exports.copyAppFiles = copyAppFiles;
//# sourceMappingURL=index.js.map