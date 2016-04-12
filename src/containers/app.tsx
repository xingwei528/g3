import * as React from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as utils from '../lib/utils'
import * as models from '../api/models'
import * as states from '../constants/states';
import SideNav from "../components/sideNav"
import Footer from "../components/footer"
import * as links from '../constants/links';

interface P {
  authState?: states.AuthState,
  orgState?: states.OrgState,
  children?: any
}

class App extends React.Component<P, {}> {
  render() {
    return (
      <div id="homepage">
        <SideNav />
        <div id="content_container">
          {this.props.children}
          <Footer />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: states.AllState) {
  return {
    authState: state.authState,
    orgState: state.orgState
  };
}

export default connect(
  mapStateToProps
)(App);
