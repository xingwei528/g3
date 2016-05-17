export class G3Config {
  _appPath: string
  _g3Path: string
  _dataPath: string
  _sourcePath: string
  _destinationPath: string

  _timeStamp: number
  _files: Array<string>
  _directories: Array<string>
  _indexContent: string

  source: string
  destination: string
  history: string
  port: number

  output: {
    path: string
    publicPath: string
    filename: string
  }
}

export class DirConfig {
  path: string
  layout: string
  index: string
  redirect: string
  includes: Array<string>
  excludes: Array<string>
}

export class SourceDir {
  key: string
  path: string
  filenames: Array<string>
  dirnames: Array<string>
  components: Array<string>
  isExclude: boolean

  parent: SourceDir
  config: DirConfig
}
