"use strict";
const React = require('react');
class Intro extends React.Component {
    render() {
        return (<div id="intro">
          <div className="work-intro">
              <h1 className="work-title">Our Work</h1>
              <div className="rich-text"><b>We deliver powerful applications.</b>Tivix has deep experience in developing software for web, mobile, and cloud platforms<b>&nbsp;</b>. Whether we are developing with Python/Django, iOS, Android, or AngularJS, our job is to deliver <b>software that matters.&nbsp;</b></div>
          </div>
          <div className="work-nav">
              <h5>View projects by:</h5>
              <ul>
                  <li><a href="#web">Web <i className="fa fa-angle-right"/></a></li>
                  <li><a href="#mobile">Mobile <i className="fa fa-angle-right"/></a></li>
                  <li><a href="#opensource">Open source <i className="fa fa-angle-right"/></a></li>
              </ul>
          </div>
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Intro;
//# sourceMappingURL=Intro.jsx.map