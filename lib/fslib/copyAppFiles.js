"use strict";
var path = require('path');
var fm = require('front-matter');
var fslib = require('./');
function copyAppFiles(config) {
    config._files.forEach(function (file) {
        var filePath = path.join(config._appPath, file);
        if (file !== 'g3.json' && file !== 'package.json' && file !== '.gitignore') {
            fslib.copySync(filePath, path.join(config.destination, file));
        }
    });
    config._directories.forEach(function (dir) {
        var dirPath = path.join(config._appPath, dir);
        if (dir !== 'node_modules' && dirPath !== config.source && dirPath !== config._g3Path && dirPath !== config.destination) {
            fslib.copySync(dirPath, path.join(config.destination, dir));
        }
    });
}
exports.copyAppFiles = copyAppFiles;
//# sourceMappingURL=copyAppFiles.js.map