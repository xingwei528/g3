"use strict";
const React = require('react');
const request = require('browser-request');
class TeamMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            title: null,
            imageUrl: null,
            body: null,
        };
    }
    componentDidMount() {
        const url = '/data/team/' + this.props.params.id + '.json';
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const response = JSON.parse(body);
                this.setState({
                    name: response.name,
                    title: response.title,
                    imageUrl: response.imageUrl,
                    body: response.body,
                });
            }
        });
    }
    render() {
        if (!this.state.name)
            return null;
        return (<div id="team_member">
        <article className="member">
          <div className="member-portrait">
            <img src={this.state.imageUrl} width={200} height={200}/>
          </div>
          <div className="member-bio">
            <h1 className="member-name">{this.state.name}</h1>
            <h2 className="member-title">{this.state.title}</h2>
            <div>
              <p />
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: this.state.body }}></div>
              <p />
            </div>
            <ul className="social"/>
            <div className="more-posts">
              <div className="gradient-overlay"/>
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
      </div>);
    }
}
module.exports = TeamMember;
//# sourceMappingURL=index.jsx.map