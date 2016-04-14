import React from 'react'
import { IndexLink, Link } from 'react-router'
import {WebRequest} from '../../../../../lib/http'
import Intro from './Intro'
import Web from './Web'
import Mobile from './Mobile'
import OpenSource from './OpenSource'

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
    WebRequest.get(url, (err, res: string) => {
      const response = JSON.parse(res)
      this.setState({
        web: response.web,
        mobile: response.mobile,
        openSource: response.openSource,
      })
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
