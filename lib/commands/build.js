"use strict";
var path = require('path');
var webpack = require('webpack');
var models = require('../models');
var fslib = require('../fslib');
function build(appPath) {
    var config = fslib.getConfig(appPath, 'build');
    fslib.removeSync(config.destination);
    fslib.copyAppFiles(config);
    if (!fslib.prepareG3(config)) {
        return false;
    }
    fslib.parse(config, function () {
        var options = {
            entry: path.join(config._g3Path, '/' + models.Const.FILE_APP_JSX),
            'process.env.NODE_ENV': '"production"',
            errorDetails: false,
            debug: false,
            output: {
                path: path.join(config.destination, './assets/js'),
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
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV ? process.env.NODE_ENV : 'production'),
                    }
                }),
            ]
        };
        return webpack(options).run(function (error) {
            if (error) {
                console.log('failed to compile bundle.js');
            }
        });
    });
}
exports.build = build;
//# sourceMappingURL=build.js.map