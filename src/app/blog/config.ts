module.exports = {
  path: '/blog',

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
        require('./content/config'),
      ])
    })
  }
}
