import * as path from 'path'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as models from '../../models'
import * as fslib from '../../fslib'

export function build(appPath) {
  const config: models.Config = fslib.getConfig(appPath, 'build')
  fslib.copyAppFiles(config)

  const sourceDirs: Array<models.SourceDir> = fslib.parse(config)
  if (!sourceDirs || sourceDirs.length === 0) return

  var options = {
    entry: path.join(config._g3Path, '/' + models.Const.FILE_APP + '.jsx'),
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
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
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
