"use strict";
var _ = require('lodash');
function isMarkdown(filepath) {
    if (_.endsWith(filepath, '.md')) {
        return true;
    }
    return false;
}
exports.isMarkdown = isMarkdown;
//# sourceMappingURL=isMarkdown.js.map