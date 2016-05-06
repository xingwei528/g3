"use strict";
var path = require('path');
var fse = require('fs-extra');
var models = require('../../models');
var lib = require('../');
function writeSync(p, chunk) {
    fse.outputFileSync(p, chunk);
}
exports.writeSync = writeSync;
function writeHTML(g3Config, routePath, devServer) {
    if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1)
        return;
    var rootFilepath = path.join(g3Config._appPath, routePath, "index.html");
    var filepath = path.join(g3Config._destinationPath, routePath, "index.html");
    var scripts = "<script src=\"/assets/js/bundle.js?v=" + g3Config._timeStamp + "\"></script>";
    if (devServer) {
        scripts = '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>';
    }
    var content = g3Config._indexContent;
    if (lib.isFile(rootFilepath)) {
        content = lib.readFileSync(rootFilepath);
    }
    var html = content.replace("<div id=\"" + models.Const.DOM_REACT_ROOT + "\"></div>", "<div id=\"" + models.Const.DOM_REACT_ROOT + "\"></div>" + scripts);
    writeSync(filepath, html);
}
exports.writeHTML = writeHTML;
//# sourceMappingURL=index.js.map