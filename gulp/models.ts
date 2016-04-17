export class Config {
  _appPath: string
  _g3Path: string
  _files: Array<string>
  _directories: Array<string>

  source: string
  destination: string
  history: string
}

export class ConfigJSON {
  path: string
  template: string
  children: Array<string>
}
