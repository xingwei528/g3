import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import * as utils from './lib/utils'
import configureStore from './store/configureStore';
import App from './containers/app'
import * as links from './constants/links'
import IndexPage from './containers/index/indexPage'
import NotFoundPage from './components/notFoundPage';
import LoginPage from './containers/login/loginPage'
import AboutPage from './containers/about/indexPage'
import TeamPage from './containers/team/indexPage'
import TeamMemberPage from './containers/team/teamMemberPage'
import EditPage from './containers/edit/indexPage'

const store = configureStore();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={links.LOGIN} component={LoginPage}/>
      <Route path={links.EDIT_} component={EditPage} />
      <Route path={links.INDEX} component={App}>
        <IndexRoute component={IndexPage} />
        <Route path={links.ABOUT} component={AboutPage} />

        <Route path={links.TEAM} component={TeamPage}>
          <Route path={links.TEAM_} component={TeamMemberPage} />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
