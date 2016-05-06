"use strict";
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var models = require('../../models');
var lib = require('../../lib');
var commands = require('../');
function run(appPath) {
    var g3Config = lib.getG3Config(appPath, 'run');
    lib.copyAppFiles(g3Config);
    var sourceDirs = lib.parse(g3Config);
    if (!sourceDirs || sourceDirs.length === 0)
        return commands.serve(appPath);
    lib.writeHTML(g3Config, '/', true);
    lib.watch(g3Config, sourceDirs);
    var options = {
        entry: path.join(g3Config._g3Path, models.Const.FILE_APP + '.jsx'),
        output: {
            path: path.join(g3Config._g3Path, './assets/js'),
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
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'file-loader'
                }
            ]
        },
        devtool: "sourcemap",
        debug: true
    };
    var port = g3Config.port || 9393;
    var compiler = webpack(options);
    return new WebpackDevServer(compiler, {
        contentBase: g3Config._destinationPath,
        stats: { colors: true },
        historyApiFallback: true
    }).listen(port, "localhost", function (err) {
        if (err)
            throw err;
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map