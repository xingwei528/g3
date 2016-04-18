"use strict";
var fse = require('fs-extra');
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
//# sourceMappingURL=isFile.js.map