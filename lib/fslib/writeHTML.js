"use strict";
var path = require('path');
var fse = require('fs-extra');
function writeHTML(config, routePath, content) {
    if (routePath.indexOf('*') !== -1 || routePath.indexOf(':') !== -1)
        return;
    var filepath = path.join(config.destination, routePath, "index.html");
    var ws = fse.createOutputStream(filepath);
    var scripts = config._command === 'run' ? '<script src="/webpack-dev-server.js"></script><script src="/bundle.js"></script>' : '<script src="/assets/js/bundle.js"></script>';
    var html = config._indexContent.replace('<div id="react-root"></div>', '<div id="react-root">' + content + '</div>' + scripts);
    ws.write(html);
}
exports.writeHTML = writeHTML;
//# sourceMappingURL=writeHTML.js.map