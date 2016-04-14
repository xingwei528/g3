module.exports = {
  path: '/team/:id',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }
}
