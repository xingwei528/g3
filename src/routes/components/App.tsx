import React from 'react'
import { browserHistory } from 'react-router'
import SideNav from "./includes/SideNav"
import Footer from "./includes/Footer"

interface P {
  children?: any
}

export default class App extends React.Component<P, {}> {
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
