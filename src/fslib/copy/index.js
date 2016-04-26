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
        if (file !== 'g3.json' && file !== 'package.json' && file !== '.gitignore') {
            copySync(filePath, path.join(config.destination, file));
        }
    });
    config._directories.forEach(function (dir) {
        var dirPath = path.join(config._appPath, dir);
        if (dir !== 'node_modules' && dirPath !== config.source && dirPath !== config._g3Path && dirPath !== config.destination) {
            copySync(dirPath, path.join(config.destination, dir));
        }
    });
}
exports.copyAppFiles = copyAppFiles;
//# sourceMappingURL=index.js.map