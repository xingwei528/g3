module.exports = {
  path: '/team',

  getIndexRoute(location, cb) {
    cb(null, require('./routes/Team'))
  },

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/TeamMember'),
      ])
    })
  }
}
