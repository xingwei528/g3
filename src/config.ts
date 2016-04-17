module.exports = {
  component: 'div',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./app/config'),
        require('./404/config'),
      ])
    })
  }
}
