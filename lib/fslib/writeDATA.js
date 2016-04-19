"use strict";
var path = require('path');
var fse = require('fs-extra');
var marked = require('marked');
var _ = require('lodash');
var fm = require('front-matter');
var isMarkdown_1 = require('./isMarkdown');
var removeSync_1 = require('./removeSync');
var writeHTML_1 = require('./writeHTML');
function writeDATA(config) {
    var dirFiles = {};
    var dataPath = path.join(config.destination, 'data');
    fse.walk(dataPath).on('readable', function () {
        var item;
        while (item = this.read()) {
            var filepath = item.path;
            var stats = fse.lstatSync(filepath);
            if (stats.isFile()) {
                if (isMarkdown_1.isMarkdown(filepath)) {
                    var content = fm(fse.readFileSync(filepath).toString());
                    var filename = path.basename(filepath);
                    filename = filename.substr(0, filename.lastIndexOf('.'));
                    var obj = _.assign({}, content.attributes, {
                        id: filename,
                        body: marked.parse(content.body)
                    });
                    var dirPath = path.dirname(filepath);
                    var jPath = filepath.substr(0, filepath.lastIndexOf('.')) + '.json';
                    var ws = fse.createOutputStream(jPath);
                    ws.write(JSON.stringify(obj));
                    var arr = dirFiles[dirPath] || [];
                    arr.push(obj);
                    dirFiles[dirPath] = arr;
                    removeSync_1.removeSync(filepath);
                    var routePath = path.relative(dataPath, filepath);
                    routePath = routePath.substr(0, routePath.lastIndexOf('.'));
                    writeHTML_1.writeHTML(config, routePath, '');
                }
            }
        }
    }).on('end', function () {
        _.keys(dirFiles).forEach(function (dirPath) {
            var arr = dirFiles[dirPath] || [];
            var ws = fse.createOutputStream(path.join(dirPath, 'index.json'));
            ws.write(JSON.stringify(arr));
        });
    });
}
exports.writeDATA = writeDATA;
//# sourceMappingURL=writeDATA.js.map