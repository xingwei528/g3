import * as React from 'react'
import * as utils from '../../lib/utils'
import * as client from '../../lib/client'

interface P {
  params: {
    username: string
  }
}

interface S {
  name: string
  title: string
  imageUrl: string
  content: string
}

export default class IndexPage extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      title: null,
      imageUrl: null,
      content: null,
    }
  }

  componentDidMount() {
    const url = '/data/team/' + this.props.params.username + '.json'
    client.default.request.get(url, '', (err, res: string) => {
      const response: S = JSON.parse(res)
      this.setState({
        name: response.name,
        title: response.title,
        imageUrl: response.imageUrl,
        content: response.content,
      })
    })
  }

  render() {
    if (!this.state.name) return null

    return (
      <div id="team_member">
        <article className="member">
                <div className="member-portrait">
                  <img src={this.state.imageUrl} width={200} height={200} />
                </div>
                <div className="member-bio">
                    <h1 className="member-name">{this.state.name}</h1>
                    <h2 className="member-title">{this.state.title}</h2>
                    <div>
                        <p />
                        <div className="rich-text">
                          {this.state.content}
                        </div>
                        <p />
                    </div>
                    <ul className="social" />
                    <div className="more-posts">
                        <div className="gradient-overlay" />
                        <h3>Blog posts by Francis</h3>
                        <ul className="posts">
                            <li><a href="/blog/why-python/">Why Python?</a></li>
                            <li><a href="/blog/react-js-the-new-kid-on-the-block/">React JS: The new kid on the block</a></li>
                            <li><a href="/blog/fabric-and-making-your-life-easy/">Fabric, and making your life easy</a></li>
                            <li><a href="/blog/ive-outgrown-my-basic-stack-now-what/">I’ve outgrown my basic stack. Now what?</a></li>
                            <li><a href="/blog/extending-the-user-model-in-django/">Extending the User Model in Django</a></li>
                        </ul>
                    </div>
                </div>
            </article>

            </div>
    )
  }
}
