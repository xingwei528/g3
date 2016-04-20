import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'

import * as models from '../models'
import * as fslib from './'

export function readdirSync(dirpath: string): string[] {
  return fse.readdirSync(dirpath)
}
