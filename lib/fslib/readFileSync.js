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
function readFile(filepath, callback) {
    try {
        fse.readFile(filepath, callback);
    }
    catch (err) {
        console.error(err);
    }
}
exports.readFile = readFile;
//# sourceMappingURL=readFileSync.js.map