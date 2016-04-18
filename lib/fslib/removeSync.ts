import * as fse from 'fs-extra'

export function removeSync(p: string) {
  try {
    fse.removeSync(p)
  } catch (err) {
    console.error(err)
  }
}
