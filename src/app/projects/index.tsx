import * as React from 'react'
import { IndexLink, Link } from 'react-router'
const request = require('browser-request')

import Intro from './components/intro'
import Web from './components/web'
import Mobile from './components/mobile'
import OpenSource from './components/openSource'

interface S {
  web: Array<{
    id: string
    name: string
    title: string
    imageUrl: string
  }>
  mobile: Array<{
    id: string
    name: string
    title: string
    imageUrl: string
  }>
  openSource: Array<{
    id: string
    name: string
    title: string
    imageUrl: string
  }>
}

class Index extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      web: null,
      mobile: null,
      openSource: null,
    }
  }

  componentDidMount() {
    const url = '/data/projects/index.json'
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const response = JSON.parse(body)
        this.setState({
          web: response.web,
          mobile: response.mobile,
          openSource: response.openSource,
        })
      }
    })
  }

  render() {
    if (!this.state.web) return null

    return (
      <div id="projects">
        <Intro />
        <Web projects={this.state.web} />
        <Mobile projects={this.state.mobile} />
        <OpenSource projects={this.state.openSource} />
      </div>
    )
  }
}

module.exports = Index
