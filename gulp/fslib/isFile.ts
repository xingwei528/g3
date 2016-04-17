import * as path from 'path'
import * as fse from 'fs-extra'

function isFile(filepath: string): boolean {
  try {
    const stats: fse.Stats = fse.lstatSync(filepath)
    return stats.isFile()
  } catch(err) {
    return false
  }
}

export = isFile
