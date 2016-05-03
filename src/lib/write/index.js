"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var marked = require('marked');
var models = require('../../models');
var lib = require('../');
function write(p, chunk) {
    fse.outputFileSync(p, chunk);
}
exports.write = write;
function writeHTML(g3Config, routePath, devServer) {
    if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1)
        return;
    var filepath = path.join(g3Config.destination, routePath, "index.html");
    var scripts = "<script src=\"/assets/js/bundle.js?v=" + g3Config._timeStamp + "\"></script>";
    if (devServer) {
        scripts = '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>';
    }
    var html = g3Config._indexContent.replace("<div id=\"" + models.Const.DOM_REACT_ROOT + "\"></div>", "<div id=\"" + models.Const.DOM_REACT_ROOT + "\"></div>" + scripts);
    write(filepath, html);
}
exports.writeHTML = writeHTML;
function writeDATA(g3Config) {
    var dataPath = path.join(g3Config.destination, models.Const.DIR_DATA);
    if (!lib.isDirectory(dataPath))
        return;
    var dirFiles = {};
    fse.walk(dataPath).on('readable', function () {
        var item;
        while (item = this.read()) {
            var filepath = item.path;
            var stats = fse.lstatSync(filepath);
            if (stats.isFile()) {
                if (lib.isMarkdown(filepath)) {
                    var content = lib.readMarkdown(filepath);
                    var filename = path.basename(filepath);
                    filename = filename.substr(0, filename.lastIndexOf('.'));
                    var obj = _.assign({}, content.attributes, {
                        id: filename,
                        body: marked.parse(content.body)
                    });
                    var dirPath = path.dirname(filepath);
                    var jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.json';
                    write(jPath, JSON.stringify(obj));
                    var arr = dirFiles[dirPath] || [];
                    arr.push(obj);
                    dirFiles[dirPath] = arr;
                    lib.removeSync(filepath);
                }
            }
        }
    }).on('end', function () {
        _.keys(dirFiles).forEach(function (dirPath) {
            var arr = dirFiles[dirPath] || [];
            write(path.join(dirPath, 'index.json'), JSON.stringify(arr));
        });
    });
}
exports.writeDATA = writeDATA;
//# sourceMappingURL=index.js.map