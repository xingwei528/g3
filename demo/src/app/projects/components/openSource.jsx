"use strict";
const React = require('react');
const react_router_1 = require('react-router');
class Mobile extends React.Component {
    render() {
        const listEl = this.props.projects.map((project) => {
            return (<div className="project-content">
            <h3 className="opensource-title">
              <react_router_1.Link to={"/projects/" + project.id}>{project.name}</react_router_1.Link>
            </h3>
            <h4 className="project-headline">{project.title}</h4>
            <react_router_1.Link to={"/projects/" + project.id}>
              <img src={project.imageUrl} className="browser" height="185" width="263"/>
            </react_router_1.Link>
        </div>);
        });
        return (<div className="work opensource" id="opensource">
          <h2>Open Source</h2>
          {listEl}
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mobile;
//# sourceMappingURL=openSource.jsx.map