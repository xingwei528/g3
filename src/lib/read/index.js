"use strict";
var fse = require('fs-extra');
var fm = require('front-matter');
function readFileSync(filepath) {
    return fse.readFileSync(filepath, 'utf-8');
}
exports.readFileSync = readFileSync;
function readFile(filepath, callback) {
    fse.readFile(filepath, callback);
}
exports.readFile = readFile;
function readMarkdown(filepath) {
    try {
        var content = fm(readFileSync(filepath).toString());
        return content;
    }
    catch (e) {
        console.log('file: ' + filepath);
        console.log(e);
    }
    return {
        body: '',
        attributes: {}
    };
}
exports.readMarkdown = readMarkdown;
//# sourceMappingURL=index.js.map