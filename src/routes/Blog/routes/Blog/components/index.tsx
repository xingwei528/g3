import React from 'react'
import {WebRequest} from '../../../../../lib/http'

interface P {
  params: {
    id: string
  }
}

interface S {
  title: string
  author: string
  postDate: string
  imageUrl: string
  content: string
}

class TeamMember extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      author: null,
      postDate: null,
      imageUrl: null,
      content: null,
    }
  }

  componentDidMount() {
    const url = '/data/blog/' + this.props.params.id + '.json'
    WebRequest.get(url, (err, res: string) => {
      const response: S = JSON.parse(res)
      this.setState({
        title: response.title,
        author: response.author,
        postDate: response.postDate,
        imageUrl: response.imageUrl,
        content: response.content,
      })
    })
  }

  render() {
    if (!this.state.title) return null

    return (
      <div id="blog_post">
        <article className="blog-post has-image">
                <header id="blog-header">
                    <div className="blog-post-masthead" id="masthead">
                        <h1 className="blog-post-title">
                        {this.state.title}
                        </h1>
                        <div className="blog-post-byline">
                        by <a href={"/team/" + this.state.author}>{this.state.author}</a>
                        </div>
                        <div className="blog-post-date">{this.state.postDate}</div>
                        <div className="post-share"><a href="#" target="_blank"><i className="fa fa-facebook-square" /></a> <a href="http://www.linkedin.com/shareArticle?mini=true&url=http://www.tivix.com/blog/announcing-hive/&title=Announcing Hivesummary=Without a doubt, the thing I love most about running Tivix is that I get to work with brilliant, energetic talent every day. Being surrounded by this team really is amazing.As a team, we keep very busy building great products for our clients. But, source=Tivix.com" target="_blank"><i className="fa fa-linkedin-square" /></a> <a href="https://twitter.com/share?url=http%3A//www.tivix.com/blog/announcing-hive/&original_referer=http%3A//www.tivix.com/blog/announcing-hive/&text=From the Tivix.com blog: Announcing Hive" target="_blank"><i className="fa fa-twitter-square" /></a></div>
                    </div>
                </header>
                <div className="masthead-div gradient-overlay" id="masthead-div" />
                <main id="main-body">
                    <div className="blog-post-body" id="content-bucket">
                        <div className="block-wysiwyg">
                            <div className="rich-text" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                        </div>
                    </div>
                    <div className="blog-post-image" id="image-bucket">
                      <img src={this.state.imageUrl} height="125" width="256" />
                    </div>
                    <div id="tag-bucket">
                        <div className="tag-container">
                            <ul>
                                <li><a className="tag" href="/blog/tags/internet"><i className="fa fa-tag" />internet</a></li>
                                <li><a className="tag" href="/blog/tags/web"><i className="fa fa-tag" />web</a></li>
                                <li><a className="tag" href="/blog/tags/software"><i className="fa fa-tag" />software</a></li>
                                <li><a className="tag" href="/blog/tags/tivix"><i className="fa fa-tag" />tivix</a></li>
                                <li><a className="tag" href="/blog/tags/hive"><i className="fa fa-tag" />hive</a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="related-bucket">
                        <div className="related-container tag-container">
                            <div className="gradient-overlay" />
                            <p>Related Posts:</p><a className="tag" href="/blog/thoughts-on-the-new-health-insurance-exchanges/">Thoughts on the Obamacare technology glitches</a>
                            <br /> <a className="tag" href="/blog/building-software-matters/">Building software that matters.</a>
                            <br /> <a className="tag" href="/blog/our-neighbor/">Our Neighbor</a>
                            <br /> <a className="tag" href="/blog/baltic-tigers/">Baltic Tigers</a>
                            <br /> <a className="tag" href="/blog/web-accessibility-regulating-ourselves/">Web Accessibility: Regulating Ourselves</a>
                            <br />
                        </div>
                    </div>
                </main>
            </article>
      </div>
    )
  }
}

module.exports = TeamMember
