"use strict";
const React = require('react');
const react_router_1 = require('react-router');
class Mobile extends React.Component {
    render() {
        const listEl = this.props.projects.map((project) => {
            return (<div className="project-content">
            <h3 className="project-title">
              <react_router_1.Link to={"/projects/" + project.id}>{project.name}</react_router_1.Link>
            </h3>
            <h4 className="project-headline">{project.title}</h4>
            <react_router_1.Link to={"/projects/" + project.id}>
              <img src={project.imageUrl} className="mobile" height="184" width="208"/>
            </react_router_1.Link>
            <p className="gradient-overlay"/>
        </div>);
        });
        return (<div className="work mobile" id="mobile">
          <h2>Mobile</h2>
          {listEl}
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mobile;
//# sourceMappingURL=mobile.jsx.map