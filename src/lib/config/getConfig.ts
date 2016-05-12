import * as path from 'path'
import * as fse from 'fs-extra'
import * as _ from 'lodash'

import * as models from '../../models'
import * as lib from '../'

export function getG3Config(appPath: string, command: string): models.G3Config {
  appPath = path.resolve(appPath)

  let config: models.G3Config = lib.readG3Config(appPath)
  config._appPath = appPath
  config._g3Path = path.join(appPath, models.Const.DIR_DOT_G3)
  config._dataPath = path.join(appPath, models.Const.DIR_DATA)
  if (!config.source) {
    config.source = './' + models.Const.DIR_SRC
  }
  if (!config.destination) {
    config.destination = './' + models.Const.DIR_PUBLIC
  }
  config._sourcePath = path.join(config._appPath, config.source)
  config._destinationPath = command === 'run' ? path.join(config._g3Path, 'public') : path.join(config._appPath, config.destination)
  config._timeStamp = Math.floor(Date.now() / 1000)

  if (!config.history) {
    config.history = 'browserHistory'
  }

  const defaultOutput = {
    path: './assets/js/',
    publicPath: '/assets/js/',
    filename: 'bundle.js'
  }
  if (!config.output) {
    config.output = defaultOutput
  }
  if (!config.output.path) config.output.path = defaultOutput.path
  if (!config.output.publicPath) config.output.publicPath = defaultOutput.publicPath
  if (!config.output.filename) config.output.filename = defaultOutput.filename

  config._files = []
  config._directories = []
  fse.readdirSync(config._appPath).forEach((p: string) => {
    if (lib.isFile(path.join(config._appPath, p))) {
      config._files.push(p)
      if (p === models.Const.FILE_INDEX + '.html') {
        config._indexContent = lib.readFileSync(path.join(config._appPath, p))
      }
    } else if (lib.isDirectory(path.join(config._appPath, p))) {
      config._directories.push(p)
    }
  })

  return config
}
