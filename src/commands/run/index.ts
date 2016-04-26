import * as path from 'path'
import * as _ from 'lodash'
import * as webpack from 'webpack'
const WebpackDevServer = require("webpack-dev-server")
import * as models from '../../models'
import * as fslib from '../../fslib'
import * as commands from '../'

export function run(appPath) {
  const config: models.Config = fslib.getConfig(appPath, 'run')
  fslib.copyAppFiles(config)

  const sourceDirs: Array<models.SourceDir> = fslib.parse(config)
  if (!sourceDirs || sourceDirs.length === 0) return commands.serve(appPath)

  fslib.watch(config, sourceDirs)

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
  }
  var port = config.port || 9393

  var compiler = webpack(options)
  return new WebpackDevServer(compiler, {
    contentBase: path.resolve(appPath + '/.g3/public'),
    stats: { colors: true },
    historyApiFallback: true
  }).listen(port, "localhost", function(err) {
    if (err) throw err
  })
}
