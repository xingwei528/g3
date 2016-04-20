"use strict";
var fse = require('fs-extra');
var fm = require('front-matter');
function write(p, content) {
    var ws = fse.createOutputStream(p);
    ws.write(content);
}
exports.write = write;
//# sourceMappingURL=write.js.map