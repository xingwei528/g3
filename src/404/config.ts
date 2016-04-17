module.exports = {
  path: '*',

  getIndexRoute(location, cb) {
    cb(null, {
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./index'))
        })
      }
    })
  }
}