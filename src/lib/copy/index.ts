import * as path from 'path'
import * as fse from 'fs-extra'

import * as models from '../../models'

export function copySync(src: string, dest: string) {
  fse.copySync(src, dest)
}

export function copy(src: string, dest: string, callback?: (err: Error) => void) {
  fse.copy(src, dest, callback)
}

export function copyAppFiles(g3Config: models.G3Config) {
  g3Config._files.forEach((file: string) => {
    const filePath = path.join(g3Config._appPath, file)
    if (file[0] === '.'
      || file === 'g3.json'
      || file === 'package.json') return

    copySync(filePath, path.join(g3Config._destinationPath, file))
  })
  g3Config._directories.forEach((dir: string) => {
    const dirPath = path.join(g3Config._appPath, dir)
    if (dir[0] === '.'
      || dir === 'node_modules'
      || dirPath === g3Config._sourcePath
      || dirPath === g3Config._destinationPath) return

    copySync(dirPath, path.join(g3Config._destinationPath, dir))
  })
}
