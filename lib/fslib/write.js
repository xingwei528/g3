"use strict";
var fse = require('fs-extra');
var fm = require('front-matter');
function write(p, chunk) {
    var ws = fse.createOutputStream(p);
    ws.write(chunk);
}
exports.write = write;
//# sourceMappingURL=write.js.map