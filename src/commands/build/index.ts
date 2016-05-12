import * as path from 'path'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as models from '../../models'
import * as lib from '../../lib'

export function build(appPath) {
  const g3Config: models.G3Config = lib.getG3Config(appPath, 'build')
  lib.copyAppFiles(g3Config)

  const sourceDirs: Array<models.SourceDir> = lib.parse(g3Config)
  if (!sourceDirs || sourceDirs.length === 0) return

  sourceDirs.forEach((sourceDir: models.SourceDir) => {
    const routePath = lib.getRoutePath(sourceDir)
    lib.writeHTML(g3Config, routePath, false)
  })

  var options = {
    entry: path.join(g3Config._g3Path, '/' + models.Const.FILE_APP + '.jsx'),
    'process.env.NODE_ENV': '"production"',
    errorDetails: false,
    debug: false,
    output: {
      path: path.join(g3Config._destinationPath, g3Config.output.path),
      publicPath: g3Config.output.publicPath,
      filename: g3Config.output.filename
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
        // require("jquery") is external and available
        //  on the global var jQuery
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
  }

  webpack(options).run((error) => {
    if (error) {
      console.log('failed to compile bundle.js')
    } else {
      console.log('build successed!')
    }
  })
}
