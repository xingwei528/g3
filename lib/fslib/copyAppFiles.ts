import * as path from 'path'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
import * as fslib from './'

export function copyAppFiles(config: models.Config) {
  config._files.forEach((file: string) => {
    const filePath = path.join(config._appPath, file)
    if (file !== 'g3.json' && file !== 'package.json' && file !== '.gitignore') {
      fslib.copySync(filePath, path.join(config.destination, file))
    }
  })
  config._directories.forEach((dir: string) => {
    const dirPath = path.join(config._appPath, dir)
    if (dir !== 'node_modules' && dirPath !== config.source && dirPath !== config._g3Path && dirPath !== config.destination) {
      fslib.copySync(dirPath, path.join(config.destination, dir))
    }
  })
}
