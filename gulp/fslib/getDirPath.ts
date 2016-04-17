import * as path from 'path'

function getDirPath(filepath: string): string {
  return path.dirname(filepath)
}

export = getDirPath
