import React from 'react'
import { IndexLink, Link } from 'react-router'
import Intro from './Intro'

interface P {
  projects: Array<{
    id: string
    name: string
    title: string
    imageUrl: string
  }>
}

export default class Mobile extends React.Component<P, {}> {
  render() {
    const listEl = this.props.projects.map((project) => {
      return (
        <div className="project-content">
            <h3 className="project-title">
              <Link to={"/projects/" + project.id}>{project.name}</Link>
            </h3>
            <h4 className="project-headline">{project.title}</h4>
            <Link to={"/projects/" + project.id}>
              <img src={project.imageUrl} className="mobile" height="184" width="208" />
            </Link>
            <p className="gradient-overlay" />
        </div>
      )
    })

    return (
      <div className="work mobile" id="mobile">
          <h2>Mobile</h2>
          {listEl}
      </div>
    )
  }
}
