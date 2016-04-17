module.exports = {
  path: '/',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./app'))
    })
  },

  getIndexRoute(location, cb) {
    cb(null, {
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./index'))
        })
      }
    })
  },

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./about/config'),
        require('./team/config'),
        require('./projects/config'),
        require('./technology/config'),
        require('./jobs/config'),
        require('./blog/config'),
        require('./contact/config'),
      ])
    })
  }
}
