import * as fse from 'fs-extra'

function copySync(src: string, dest: string) {
  try {
    fse.copySync(src, dest)
  } catch (err) {
    console.error(err)
  }
}

export = copySync
