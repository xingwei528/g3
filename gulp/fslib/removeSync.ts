import * as fse from 'fs-extra'

function removeSync(p: string) {
  try {
    fse.removeSync(p)
  } catch (err) {
    console.error(err)
  }
}

export = removeSync
