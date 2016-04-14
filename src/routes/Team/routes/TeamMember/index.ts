module.exports = {
  path: '/team/:username',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/TeamMember'))
    })
  }
}
