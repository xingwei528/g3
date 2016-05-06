import * as models from './'

export class SourceDir {
  key: string
  path: string
  filenames: Array<string>
  dirnames: Array<string>
  components: Array<string>
  isExclude: boolean

  parent: SourceDir
  config: models.DirConfig
}
