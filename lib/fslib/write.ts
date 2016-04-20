import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'
var fm = require('front-matter')

import * as models from '../models'
import * as fslib from './'


export function write(p: string, content: string) {
  const ws = fse.createOutputStream(p)
  ws.write(content)
}
