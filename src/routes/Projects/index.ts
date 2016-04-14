module.exports = {
  path: '/projects',

  getIndexRoute(location, cb) {
    cb(null, require('./routes/Index'))
  },

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Project'),
      ])
    })
  }
}
