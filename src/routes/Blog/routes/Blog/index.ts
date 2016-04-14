module.exports = {
  path: '/blog/:id',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }
}
