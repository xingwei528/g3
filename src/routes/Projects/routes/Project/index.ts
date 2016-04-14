module.exports = {
  path: '/projects/:id',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }
}
