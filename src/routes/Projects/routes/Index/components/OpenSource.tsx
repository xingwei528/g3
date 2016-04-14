import React from 'react'
import { IndexLink, Link } from 'react-router'

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
            <h3 className="opensource-title">
              <Link to={"/projects/" + project.id}>{project.name}</Link>
            </h3>
            <h4 className="project-headline">{project.title}</h4>
            <Link to={"/projects/" + project.id}>
              <img src={project.imageUrl} className="browser" height="185" width="263" />
            </Link>
        </div>
      )
    })

    return (
      <div className="work opensource" id="opensource">
          <h2>Open Source</h2>
          {listEl}
      </div>
    )
  }
}
