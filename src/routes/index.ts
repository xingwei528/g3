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
      require('./NotFound'),
    ]
  }]
}

export default rootRoute
