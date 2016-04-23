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
              <li><react_router_1.Link to="/team" activeClassName="active"><i className="icon team"/> <span>百容团队</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/about" activeClassName="active"><i className="icon about"/> <span>关于我们</span></react_router_1.Link></li>
          </ul>
          <h2>What We Do</h2>
          <ul>
              <li><react_router_1.Link to="/projects" activeClassName="active"><i className="icon work"/> <span>项目展示</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/technology" activeClassName="active"><i className="icon engineering"/> <span>技术标准</span></react_router_1.Link></li>
          </ul>
          <h2>More</h2>
          <ul>
              <li><react_router_1.Link to="/jobs" activeClassName="active"><i className="icon careers"/> <span>招聘</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/blog" activeClassName="active"><i className="icon blog"/> <span>博客</span></react_router_1.Link></li>
              <li><react_router_1.Link to="/contact" activeClassName="active"><i className="icon contact"/> <span>联系我们</span></react_router_1.Link></li>
          </ul>
          <react_router_1.Link to="/contact" className="btn"><i className="icon talk"/><span>Let's&nbsp;talk</span></react_router_1.Link>
          <button id="menu_button"/>
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideNav;
//# sourceMappingURL=sideNav.jsx.map
