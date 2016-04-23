"use strict";
const React = require('react');
const request = require('browser-request');
const intro_1 = require('./components/intro');
const web_1 = require('./components/web');
const openSource_1 = require('./components/openSource');
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }
  componentDidMount() {
    const url = '/data/projects/index.json';
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const response = JSON.parse(body);
        this.setState({projects: response});
      }
    });
  }
  render() {
    if (!this.state.projects) return null;

    let webProjects = []
    let openSourceProjects = []
    this.state.projects.forEach((project) => {
      if (project.type === 'web'){
        webProjects.push(project)
      } else if (project.type === 'openSource'){
        openSourceProjects.push(project)
      }
    })

    return (
      <div id="projects">
        <intro_1.default/>
        <web_1.default projects={webProjects}/>
        <openSource_1.default projects={openSourceProjects}/>
      </div>
    );
  }
}
module.exports = Index;
