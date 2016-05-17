import * as path from 'path'
import * as _ from 'lodash'
import * as webpack from 'webpack'
const WebpackDevServer = require("webpack-dev-server")
import * as models from '../../models'
import * as lib from '../../lib'
import * as application from '../../application'
import * as commands from '../'

export function run(appPath) {
  const g3Config: models.G3Config = application.getG3Config(appPath, 'run')
  lib.copyAppFiles(g3Config)

  const sourceDirs: Array<models.SourceDir> = application.parse(g3Config)
  if (!sourceDirs || sourceDirs.length === 0) return commands.serve(appPath)

  lib.writeHTML(g3Config, '/', true)

  application.watch(g3Config, sourceDirs)

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
  }
  var port = g3Config.port || 9393

  var compiler = webpack(options)
  return new WebpackDevServer(compiler, {
    contentBase: g3Config._destinationPath,
    stats: { colors: true },
    historyApiFallback: true
  }).listen(port, "localhost", function(err) {
    if (err) throw err
  })
}
