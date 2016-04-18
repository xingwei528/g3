"use strict";
var fse = require('fs-extra');
function readFileSync(filepath) {
    try {
        return fse.readFileSync(filepath, 'utf-8');
    }
    catch (err) {
        console.error(err);
        return '';
    }
}
exports.readFileSync = readFileSync;
//# sourceMappingURL=readFileSync.js.map