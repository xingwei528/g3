var path = require('path');
var _ = require('lodash');
var webpack = require('webpack')
var WebpackDevServer = require("webpack-dev-server")
import * as models from '../models'
import * as fslib from '../fslib'

export function run(appPath) {
  const config: models.Config = fslib.getConfig(appPath, 'run')
  fslib.copyAppFiles(config)
  if (!fslib.prepareG3(config)) {
    return false
  }

  console.log(config._g3Path)

  fslib.parse(config, () => {
    var options = {
      entry: path.join(config._g3Path, models.Const.FILE_APP_JSX),
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
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['es2015', 'stage-0', 'react']
            }
          }
        ]
      },
      devtool: "sourcemap",
      debug: true
    }
    var port = 9393

    var compiler = webpack(options)
    return new WebpackDevServer(compiler, {
      contentBase: path.resolve(appPath + '/.g3/public'),
      stats: {
        colors: true
      },
      historyApiFallback: true
    }).listen(port, "localhost", function(err) {
      if (err) throw err
    })
  })
}
