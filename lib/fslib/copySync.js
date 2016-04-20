"use strict";
var fse = require('fs-extra');
function copySync(src, dest) {
    try {
        fse.copySync(src, dest);
    }
    catch (err) {
        console.error(err);
    }
}
exports.copySync = copySync;
function copy(src, dest) {
    try {
        fse.copy(src, dest);
    }
    catch (err) {
        console.error(err);
    }
}
exports.copy = copy;
//# sourceMappingURL=copySync.js.map