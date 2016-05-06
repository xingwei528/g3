"use strict";
var prepare_1 = require('./parseFiles/prepare');
var parseSourceFiles_1 = require('./parseFiles/parseSourceFiles');
var parseDataFiles_1 = require('./parseFiles/parseDataFiles');
function parse(g3Config) {
    prepare_1.prepare(g3Config);
    parseDataFiles_1.parseDataFiles(g3Config);
    return parseSourceFiles_1.parseSourceFiles(g3Config);
}
exports.parse = parse;
//# sourceMappingURL=index.js.map