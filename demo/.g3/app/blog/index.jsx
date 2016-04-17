"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const request = require('browser-request');
class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: null,
        };
    }
    componentDidMount() {
        const url = '/data/blog/index.json';
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const contents = JSON.parse(body);
                this.setState({
                    contents: contents,
                });
            }
        });
    }
    render() {
        if (!this.state.contents)
            return null;
        const listEl = this.state.contents.map((content) => {
            return (<article className="blog-post blog-post-preview has-image">
            <div className="blog-post-image-preview">
                <react_router_1.Link to={"/blog/" + content.id}><img alt="BrowserStack Choose Emulator" height={134} src="/uploads/images/browserstack_choose_emulator.max-256x256.png" width={256}/></react_router_1.Link>
            </div>
            <div className="blog-post-body-preview">
                <h1 className="blog-post-title">
                <react_router_1.Link to={"/blog/" + content.id}>{content.title}</react_router_1.Link>
                </h1>
                <p className="blog-post-byline">By {content.author}</p>
                <p className="blog-post-date">{content.postDate}</p>
                <div className="blog-post-content">
                    <div className="block-wysiwyg">
                        <div className="rich-text" dangerouslySetInnerHTML={{ __html: content.body }}></div>
                    </div>
                    <react_router_1.Link to={"/blog/" + content.id} className="blog-post-read-more">Read more »</react_router_1.Link>
                    <div className="tag-container">
                        <ul>
                            <li><a className="tag" href="/blog/tags/browser"><i className="fa fa-tag"/>browser</a></li>
                            <li><a className="tag" href="/blog/tags/testing"><i className="fa fa-tag"/>testing</a></li>
                        </ul>
                    </div>
                </div>
                <div className="gradient-overlay"/>
            </div>
        </article>);
        });
        return (<div id="blog_index">
                <div id="intro">
                    <div className="headline">
                        <h1>We have opinions. <br />And we aren't afraid to share them.</h1>
                        <div className="gradient-overlay"/>
                    </div>
                </div>
                {listEl}
                <div className="blog-pagination-container">
                    <div className="blog-pagination"><a className="blog-next" href="?page=2">OLDER POSTS<i className="fa fa-arrow-circle-o-right"/></a></div>
                </div>
            </div>);
    }
}
module.exports = Team;
//# sourceMappingURL=index.jsx.map