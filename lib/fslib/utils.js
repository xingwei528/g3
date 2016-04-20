"use strict";
var _ = require('lodash');
var fse = require('fs-extra');
function isDirectory(filepath) {
    try {
        var stats = fse.lstatSync(filepath);
        return stats.isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.isDirectory = isDirectory;
function isFile(filepath) {
    try {
        var stats = fse.lstatSync(filepath);
        return stats.isFile();
    }
    catch (err) {
        return false;
    }
}
exports.isFile = isFile;
function isMarkdown(filepath) {
    if (_.endsWith(filepath, '.md')) {
        return true;
    }
    return false;
}
exports.isMarkdown = isMarkdown;
//# sourceMappingURL=utils.js.map