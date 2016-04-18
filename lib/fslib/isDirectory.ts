import * as path from 'path'
import * as fse from 'fs-extra'

export function isDirectory(filepath: string): boolean {
  try {
    const stats: fse.Stats = fse.lstatSync(filepath)
    return stats.isDirectory()
  } catch(err) {
    return false
  }
}
