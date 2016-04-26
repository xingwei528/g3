"use strict";
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var marked = require('marked');
var models = require('../../models');
var fslib = require('../');
function write(p, chunk) {
    var ws = fse.createOutputStream(p);
    ws.write(chunk);
}
exports.write = write;
function writeHTML(config, routePath, content) {
    if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1)
        return;
    var filepath = path.join(config.destination, routePath, "index.html");
    var scripts = config._command === 'run' ? '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>' : '<script src="/assets/js/bundle.js"></script>';
    var html = config._indexContent.replace('<div id="' + models.Const.DOM_REACT_ROOT + '"></div>', '<div id="' + models.Const.DOM_REACT_ROOT + '">' + content + '</div>' + scripts);
    write(filepath, html);
}
exports.writeHTML = writeHTML;
function writeDATA(config) {
    var dataPath = path.join(config.destination, models.Const.DIR_DATA);
    if (!fslib.isDirectory(dataPath))
        return;
    var dirFiles = {};
    fse.walk(dataPath).on('readable', function () {
        var item;
        while (item = this.read()) {
            var filepath = item.path;
            var stats = fse.lstatSync(filepath);
            if (stats.isFile()) {
                if (fslib.isMarkdown(filepath)) {
                    var content = fslib.readMarkdown(filepath);
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
                    fslib.removeSync(filepath);
                    var routePath = path.relative(dataPath, filepath);
                    routePath = routePath.substr(0, routePath.lastIndexOf('.'));
                    writeHTML(config, routePath, '');
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