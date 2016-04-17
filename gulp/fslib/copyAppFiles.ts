import * as path from 'path'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
const copySync = require('./copySync')
const removeSync = require('./removeSync')
const isFile = require('./isFile')

function copyAppFiles(config: models.Config) {
  config._files.forEach((file: string) => {
    const filePath = path.join(config._appPath, file)
    if (file !== 'g3.json') {
      copySync(filePath, path.join(config.destination, file))
    }
  })
  config._directories.forEach((dir: string) => {
    const dirPath = path.join(config._appPath, dir)
    if (dirPath !== config.source && dirPath !== config._g3Path && dirPath !== config.destination) {
      copySync(dirPath, path.join(config.destination, dir))
    }
  })
}

export = copyAppFiles
