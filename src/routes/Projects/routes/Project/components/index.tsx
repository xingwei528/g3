import React from 'react'
import {WebRequest} from '../../../../../lib/http'

interface P {
  params: {
    id: string
  }
}

interface S {
  name: string
  title: string
  imageUrl: string
  website: string
  content: string
}

class TeamMember extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      title: null,
      imageUrl: null,
      website: null,
      content: null,
    }
  }

  componentDidMount() {
    const url = '/data/projects/' + this.props.params.id + '.json'
    WebRequest.get(url, (err, res: string) => {
      const response: S = JSON.parse(res)
      this.setState({
        name: response.name,
        title: response.title,
        imageUrl: response.imageUrl,
        website: response.website,
        content: response.content,
      })
    })
  }

  render() {
    if (!this.state.name) return null

    return (
      <div id="projects">
                <div className="project">
                    <div className="work-intro">
                        <h3>{this.state.name}</h3>
                        <h1 className="work-title">
                          {this.state.title}
                        </h1></div>
                    <div className="work-nav">
                        <h5>View projects by:</h5>
                        <ul>
                            <li><a href="/projects#web">Web <i className="fa fa-angle-right" /></a></li>
                            <li><a href="/projects#mobile">Mobile <i className="fa fa-angle-right" /></a></li>
                            <li><a href="/projects#opensource">Open source <i className="fa fa-angle-right" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="screen-section">
                    <div className="featured-work-screen">
                      <img src={this.state.imageUrl} className="browser" height={416} width={593} />
                    </div>
                    <div className="description">
                        <div className="rich-text" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                        <a href={this.state.website} target="_blank">Check it out »</a></div>
                </div>
            </div>

    )
  }
}

module.exports = TeamMember
