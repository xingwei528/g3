"use strict";
var fse = require('fs-extra');
function removeSync(p) {
    try {
        fse.removeSync(p);
    }
    catch (err) {
        console.error(err);
    }
}
exports.removeSync = removeSync;
//# sourceMappingURL=removeSync.js.map