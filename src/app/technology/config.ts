module.exports = {
  path: '/technology',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index'))
    })
  }
}
