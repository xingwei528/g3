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
    if (file[0] === '.'
      || file === 'g3.json'
      || file === 'package.json') return

    copySync(filePath, path.join(config.destination, file))
  })
  config._directories.forEach((dir: string) => {
    const dirPath = path.join(config._appPath, dir)
    if (dir[0] === '.'
      || dir === 'node_modules'
      || dirPath === config.source
      || dirPath === config.destination) return

    copySync(dirPath, path.join(config.destination, dir))
  })
}
