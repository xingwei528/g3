"use strict";
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
//# sourceMappingURL=isDirectory.js.map