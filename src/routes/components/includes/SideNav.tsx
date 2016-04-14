import React from 'react'
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
              <li><a href="/projects"><i className="icon work" /> <span>Our work</span></a></li>
              <li><a href="/engineering"><i className="icon engineering" /> <span>Engineering</span></a></li>
              <li><a href="/innovation"><i className="icon innovation" /> <span>Innovation</span></a></li>
          </ul>
          <h2>More</h2>
          <ul>
              <li><a href="/careers"><i className="icon careers" /> <span>Careers</span></a></li>
              <li><a href="/blog"><i className="icon blog" /> <span>Blog</span></a></li>
              <li><a href="/contact-us"><i className="icon contact" /> <span>Contact us</span></a></li>
          </ul>
          <a className="btn" href="/contact-us"><i className="icon talk" /><span>Let's&nbsp;talk</span></a>
          <button id="menu_button" />
      </div>
    )
  }
}
