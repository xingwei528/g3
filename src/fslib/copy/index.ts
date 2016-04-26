import * as path from 'path'
import * as fse from 'fs-extra'

import * as models from '../../models'

export function copySync(src: string, dest: string) {
  fse.copySync(src, dest)
}

export function copy(src: string, dest: string, callback?: (err: Error) => void) {
  fse.copy(src, dest, callback)
}

export function copyAppFiles(config: models.Config) {
  config._files.forEach((file: string) => {
    const filePath = path.join(config._appPath, file)
    if (file !== 'g3.json' && file !== 'package.json' && file !== '.gitignore') {
      copySync(filePath, path.join(config.destination, file))
    }
  })
  config._directories.forEach((dir: string) => {
    const dirPath = path.join(config._appPath, dir)
    if (dir !== 'node_modules' && dirPath !== config.source && dirPath !== config._g3Path && dirPath !== config.destination) {
      copySync(dirPath, path.join(config.destination, dir))
    }
  })
}
