// AuthConfig contains authorization information
export class HomeAuthConfig {
  username: string
  password: string
  accessToken: string
}

// Config ~/.get3w/config.json file info
export class HomeConfig {
  auth: string
  apps: Array<HomeApp>
  authConfig: HomeAuthConfig
}

export class HomeApp {
  id: string
  owner: string
  name: string
  from: string
  path: string
  private: boolean
  createdAt: string
  updatedAt: string
  starCount: number
  cloneCount: number
  origin: string
  host: string
  description: string
  tags: string
  thumbSmall: string
  thumbLarge: string
}
