import * as React from 'react'
import { browserHistory } from 'react-router'
import SideNav from "./components/sideNav"
import Footer from "./components/footer"

interface P {
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

export = App
