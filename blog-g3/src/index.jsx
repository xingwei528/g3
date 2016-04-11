"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const configureStore_1 = require('./store/configureStore');
const app_1 = require('./containers/app');
const links = require('./constants/links');
const indexPage_1 = require('./components/index/indexPage');
const notFoundPage_1 = require('./components/notFoundPage');
const loginPage_1 = require('./containers/login/loginPage');
const indexPage_2 = require('./containers/edit/indexPage');
const store = configureStore_1.default();
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={links.LOGIN} component={LoginPage}/>
      <Route path={links.EDIT_} component={EditPage} />
      <Route path={links.INDEX} component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
