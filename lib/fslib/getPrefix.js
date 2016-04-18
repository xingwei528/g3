"use strict";
var path = require('path');
function getPrefix() {
    var prefix;
    if (process && process.platform === 'win32') {
        prefix = process.env.APPDATA
            ? path.join(process.env.APPDATA, 'npm')
            : path.dirname(process.execPath);
    }
    else {
        prefix = path.dirname(path.dirname(process.execPath));
        if (process.env.DESTDIR) {
            prefix = path.join(process.env.DESTDIR, prefix);
        }
    }
    return prefix;
}
exports.getPrefix = getPrefix;
//# sourceMappingURL=getPrefix.js.map