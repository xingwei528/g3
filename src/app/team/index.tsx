import * as React from 'react'
import { IndexLink, Link } from 'react-router'
const request = require('browser-request')

interface S {
  members: Array<{
    id: string
    name: string
    title: string
    imageUrl: string
  }>
}

class Team extends React.Component<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      members: null,
    }
  }

  componentDidMount() {
    const url = '/data/team/index.json'
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const members = JSON.parse(body)
        this.setState({
          members: members,
        })
      }
    })
  }

  render() {
    if (!this.state.members) return null

    const listEl = this.state.members.map((member: {
      id: string
      name: string
      title: string
      imageUrl: string
    }) => {
      return (
        <div className="team-member">
          <Link to={"/team/" + member.id}>
            <div className="team-overlay">
              {member.name}
              <div className="title">{member.title}</div>
            </div>
            <img alt={member.name} className="team-member-photo" height="170" src={member.imageUrl} width="170" />
          </Link>
        </div>
      )
    })

    return (
      <div id="team">
                <div className="team-index-listing">
                    <div className="team-intro">
                        <h1 className="team-title">Tivix Team</h1>
                        <div className="rich-text">
                            <p>
                            <b>We are in a business where team is everything.</b>
                            From software engineers to UX experts, from product designers to project managers, the Tivix team is an extraordinary group with a deep passion for working with clients to build
                                software that matters.</p>
                        </div>
                    </div>
                </div>
                <div className="team-grid-outer">
                    <div id="team_grid">
                        {listEl}
                    </div>
                </div>
                <div className="row">
                    <section id="testimonial_section">
                        <div className="testimonial">
                            <blockquote>
                                <p>An idea can turn to dust or magic, depending on the talent that rubs against it.</p>
                                <footer><cite><strong>William Bernbach</strong>, Doyle Dane Bernbach</cite></footer>
                            </blockquote>
                        </div>
                    </section>
                </div>
            </div>
    )
  }
}

module.exports = Team
