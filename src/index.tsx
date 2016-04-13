import * as React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './containers/app'
import IndexPage from './containers/index/indexPage'
import NotFoundPage from './containers/404/indexPage';
import AboutPage from './containers/about/indexPage'
import TeamPage from './containers/team/indexPage'
import TeamMemberPage from './containers/team/teamMemberPage'

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="/about" component={AboutPage} />

      <Route path="/team" component={TeamPage}>
        <Route path="/team/:username" component={TeamMemberPage} />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>,
  document.getElementById('root')
)
