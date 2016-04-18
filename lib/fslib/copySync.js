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
//# sourceMappingURL=copySync.js.map