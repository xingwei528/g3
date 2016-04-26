"use strict";
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var models = require('../../models');
var fslib = require('../../fslib');
var commands = require('../');
function run(appPath) {
    var config = fslib.getConfig(appPath, 'run');
    fslib.copyAppFiles(config);
    var sourceDirs = fslib.parse(config);
    if (!sourceDirs || sourceDirs.length === 0)
        return commands.serve(appPath);
    fslib.watch(config, sourceDirs);
    var options = {
        entry: path.join(config._g3Path, models.Const.FILE_APP + '.jsx'),
        output: {
            path: path.join(config._g3Path, './assets/js'),
            publicPath: "/",
            filename: "bundle.js"
        },
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js']
        },
        resolveLoader: {
            root: path.join(__dirname, 'node_modules')
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }
            ]
        },
        devtool: "sourcemap",
        debug: true
    };
    var port = config.port || 9393;
    var compiler = webpack(options);
    return new WebpackDevServer(compiler, {
        contentBase: path.resolve(appPath + '/.g3/public'),
        stats: { colors: true },
        historyApiFallback: true
    }).listen(port, "localhost", function (err) {
        if (err)
            throw err;
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map