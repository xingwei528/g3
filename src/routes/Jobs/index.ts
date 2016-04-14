module.exports = {
  path: '/jobs',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }
}
