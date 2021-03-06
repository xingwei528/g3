"use strict";
var path = require('path');
var models = require('../../../models');
var lib = require('../../../lib');
var application = require('../../');
function parseSourceFiles(g3Config) {
    var sourceDirs = [];
    if (!lib.isDirectory(g3Config._sourcePath))
        return sourceDirs;
    if (!lib.isDirectory(g3Config._g3Path)) {
        console.log('Parsing the source files for the first time, please be patient');
    }
    lib.copySync(g3Config._sourcePath, g3Config._g3Path);
    if (!lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.jsx') && !lib.isFile(path.join(g3Config._g3Path, models.Const.FILE_APP) + '.html')) {
        lib.writeSync(path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'), application.getAppJSContent(g3Config));
    }
    application.getSourceDirs(g3Config, g3Config._sourcePath, null, false, sourceDirs);
    sourceDirs.forEach(function (sourceDir) {
        if (!sourceDir.isExclude) {
            var configPath = path.join(g3Config._g3Path, sourceDir.key, models.Const.FILE_CONFIG_JS);
            var configContent = application.getConfigJSContent(g3Config, sourceDir);
            lib.writeSync(configPath, configContent);
        }
        sourceDir.filenames.forEach(function (filename) {
            var ext = path.extname(filename);
            if (ext === '.html' || ext === '.html' || ext === '.jsx') {
                var filePath = path.join(g3Config._g3Path, sourceDir.key, filename);
                var jsxPath = path.join(g3Config._g3Path, sourceDir.key, filename.substring(0, filename.lastIndexOf('.')) + '.jsx');
                var content = lib.readFileSync(filePath);
                var jsx = '';
                if (sourceDir.key === '/' && filename.toLowerCase() === 'app.jsx') {
                    jsx = content;
                }
                else {
                    jsx = lib.getJSXContent(ext, content, sourceDir.components);
                }
                lib.writeSync(jsxPath, jsx);
            }
        });
    });
    return sourceDirs;
}
exports.parseSourceFiles = parseSourceFiles;
//# sourceMappingURL=parseSourceFiles.js.map