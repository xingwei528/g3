import * as fse from 'fs-extra'

export function copySync(src: string, dest: string) {
  try {
    fse.copySync(src, dest)
  } catch (err) {
    console.error(err)
  }
}

export function copy(src: string, dest: string) {
  try {
    fse.copy(src, dest)
  } catch (err) {
    console.error(err)
  }
}
