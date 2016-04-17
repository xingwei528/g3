"use strict";
const React = require('react');
const request = require('browser-request');
const intro_1 = require('./components/intro');
const web_1 = require('./components/web');
const mobile_1 = require('./components/mobile');
const openSource_1 = require('./components/openSource');
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web: null,
            mobile: null,
            openSource: null,
        };
    }
    componentDidMount() {
        const url = '/data/projects/index.json';
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const response = JSON.parse(body);
                this.setState({
                    web: response.web,
                    mobile: response.mobile,
                    openSource: response.openSource,
                });
            }
        });
    }
    render() {
        if (!this.state.web)
            return null;
        return (<div id="projects">
        <intro_1.default />
        <web_1.default projects={this.state.web}/>
        <mobile_1.default projects={this.state.mobile}/>
        <openSource_1.default projects={this.state.openSource}/>
      </div>);
    }
}
module.exports = Index;
//# sourceMappingURL=index.jsx.map