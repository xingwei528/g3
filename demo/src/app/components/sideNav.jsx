"use strict";
const React = require('react');
const react_router_1 = require('react-router');
class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div id="side_nav" role="navigation">
          <h1><react_router_1.IndexLink to="/" id="logo">BAIRONG.IO</react_router_1.IndexLink></h1>
          <h2>Who we are</h2>
          <ul>
              <li><react_router_1.Link to="/team" activeClassName="active"><i className="icon team"/> <span>Our team</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/about" activeClassName="active"><i className="icon about"/> <span>About us</span></react_router_1.Link></li>
          </ul>
          <h2>What We Do</h2>
          <ul>
              <li><react_router_1.Link to="/projects" activeClassName="active"><i className="icon work"/> <span>Our work</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/technology" activeClassName="active"><i className="icon engineering"/> <span>Technology</span></react_router_1.Link></li>
          </ul>
          <h2>More</h2>
          <ul>
              <li><react_router_1.Link to="/jobs" activeClassName="active"><i className="icon careers"/> <span>Jobs</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/blog" activeClassName="active"><i className="icon blog"/> <span>Blog</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/contact" activeClassName="active"><i className="icon contact"/> <span>Contact us</span></react_router_1.Link></li>
          </ul>
          <react_router_1.Link to="/contact" className="btn"><i className="icon talk"/><span>Let's&nbsp;talk</span></react_router_1.Link>
          <button id="menu_button"/>
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideNav;
//# sourceMappingURL=sideNav.jsx.map