import * as path from 'path'
import * as _ from 'lodash'
import * as fse from 'fs-extra'
import * as marked from 'marked'

import * as models from '../../models'
import {prepare} from './parseFiles/prepare'
import {parseSourceFiles} from './parseFiles/parseSourceFiles'
import {parseDataFiles} from './parseFiles/parseDataFiles'

export function parse(g3Config: models.G3Config): Array<models.SourceDir> {
  prepare(g3Config)
  parseDataFiles(g3Config)
  return parseSourceFiles(g3Config)
}
