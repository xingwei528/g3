"use strict";
var fse = require('fs-extra');
function readdirSync(dirpath) {
    return fse.readdirSync(dirpath);
}
exports.readdirSync = readdirSync;
//# sourceMappingURL=list.js.map