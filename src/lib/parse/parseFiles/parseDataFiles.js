"use strict";
var path = require('path');
var _ = require('lodash');
var marked = require('marked');
var models = require('../../../models');
var lib = require('../../');
function parseDataFiles(g3Config) {
    if (!lib.isDirectory(g3Config._dataPath))
        return;
    parseDir(g3Config, './');
}
exports.parseDataFiles = parseDataFiles;
function parseFile(g3Config, relatedPath) {
    var filePath = path.join(g3Config._dataPath, relatedPath);
    var fileObj = null;
    if (lib.isMarkdown(filePath)) {
        var content = lib.readMarkdown(filePath);
        var filename = path.basename(filePath);
        filename = filename.substr(0, filename.lastIndexOf('.'));
        fileObj = _.assign({}, content.attributes, {
            id: filename,
            body: marked.parse(content.body)
        });
        var dirPath = path.dirname(filePath);
        var jPath = path.join(g3Config._destinationPath, models.Const.DIR_DATA, relatedPath.substr(0, relatedPath.lastIndexOf('.')) + '.json');
        lib.writeSync(jPath, JSON.stringify(fileObj));
    }
    return fileObj;
}
function parseDir(g3Config, relatedPath) {
    var dirPath = path.join(g3Config._dataPath, relatedPath);
    var list = lib.listSync(dirPath);
    if (list.filenames && list.filenames.length > 0) {
        var arr_1 = [];
        list.filenames.forEach(function (filename) {
            var fileObj = parseFile(g3Config, path.join(relatedPath, filename));
            if (fileObj) {
                arr_1.push(fileObj);
            }
        });
        console.log(path.join(g3Config._destinationPath, models.Const.DIR_DATA, relatedPath, 'index.json'));
        lib.writeSync(path.join(g3Config._destinationPath, models.Const.DIR_DATA, relatedPath, 'index.json'), JSON.stringify(arr_1));
    }
    if (list.dirnames && list.dirnames.length > 0) {
        list.dirnames.forEach(function (dirname) {
            parseDir(g3Config, path.join(relatedPath, dirname));
        });
    }
}
//# sourceMappingURL=parseDataFiles.js.map