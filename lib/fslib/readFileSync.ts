import * as fse from 'fs-extra'

export function readFileSync(filepath: string): string {
  try {
    return fse.readFileSync(filepath, 'utf-8')
  } catch (err) {
    console.error(err)
    return ''
  }
}

export function readFile(filepath: string, callback: (error: Error, data: NodeBuffer) => void) {
  try {
    fse.readFile(filepath, callback)
  } catch (err) {
    console.error(err)
  }
}
