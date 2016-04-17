import * as React from 'react'
import { IndexLink, Link } from 'react-router'

export default class SideNav extends React.Component<{}, {}> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="side_nav" role="navigation">
          <h1><IndexLink to="/" id="logo">BAIRONG.IO</IndexLink></h1>
          <h2>Who we are</h2>
          <ul>
              <li><Link to="/team" activeClassName="active"><i className="icon team" /> <span>Our team</span></Link></li>
              <li><Link to="/about" activeClassName="active"><i className="icon about" /> <span>About us</span></Link></li>
          </ul>
          <h2>What We Do</h2>
          <ul>
              <li><Link to="/projects" activeClassName="active"><i className="icon work" /> <span>Our work</span></Link></li>
              <li><Link to="/technology" activeClassName="active"><i className="icon engineering" /> <span>Technology</span></Link></li>
          </ul>
          <h2>More</h2>
          <ul>
              <li><Link to="/jobs" activeClassName="active"><i className="icon careers" /> <span>Jobs</span></Link></li>
              <li><Link to="/blog" activeClassName="active"><i className="icon blog" /> <span>Blog</span></Link></li>
              <li><Link to="/contact" activeClassName="active"><i className="icon contact" /> <span>Contact us</span></Link></li>
          </ul>
          <Link to="/contact" className="btn"><i className="icon talk" /><span>Let's&nbsp;talk</span></Link>
          <button id="menu_button" />
      </div>
    )
  }
}
