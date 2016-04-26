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
function copyAppFiles(config) {
    config._files.forEach(function (file) {
        var filePath = path.join(config._appPath, file);
        if (file[0] === '.'
            || file === 'g3.json'
            || file === 'package.json')
            return;
        copySync(filePath, path.join(config.destination, file));
    });
    config._directories.forEach(function (dir) {
        var dirPath = path.join(config._appPath, dir);
        if (dir[0] === '.'
            || dir === 'node_modules'
            || dirPath === config.source
            || dirPath === config.destination)
            return;
        copySync(dirPath, path.join(config.destination, dir));
    });
}
exports.copyAppFiles = copyAppFiles;
//# sourceMappingURL=index.js.map