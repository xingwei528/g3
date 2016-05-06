"use strict";
var path = require('path');
var webpack = require('webpack');
var models = require('../../models');
var lib = require('../../lib');
function build(appPath) {
    var g3Config = lib.getG3Config(appPath, 'build');
    lib.copyAppFiles(g3Config);
    var sourceDirs = lib.parse(g3Config);
    if (!sourceDirs || sourceDirs.length === 0)
        return;
    sourceDirs.forEach(function (sourceDir) {
        var routePath = lib.getRoutePath(sourceDir);
        lib.writeHTML(g3Config, routePath, false);
    });
    var options = {
        entry: path.join(g3Config._g3Path, '/' + models.Const.FILE_APP + '.jsx'),
        'process.env.NODE_ENV': '"production"',
        errorDetails: false,
        debug: false,
        output: {
            path: path.join(g3Config._destinationPath, './assets/js'),
            publicPath: "/assets/js/",
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
        externals: {
            "electron": "electron"
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV ? process.env.NODE_ENV : 'production')
                }
            })
        ]
    };
    webpack(options).run(function (error) {
        if (error) {
            console.log('failed to compile bundle.js');
        }
        else {
            console.log('build successed!');
        }
    });
}
exports.build = build;
//# sourceMappingURL=index.js.map