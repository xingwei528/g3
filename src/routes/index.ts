import Home from './components/Home'
import App from './components/App'

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      require('./About'),
      require('./Team'),
      require('./Projects'),
      require('./Technology'),
      require('./Jobs'),
      require('./Blog'),
      require('./Contact'),
      require('./NotFound'),
    ]
  }]
}

export default rootRoute
