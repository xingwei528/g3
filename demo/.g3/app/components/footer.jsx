"use strict";
const React = require('react');
class Footer extends React.Component {
    render() {
        return (<footer id="footer">
          <div className="footer-inner">
            <ul>
              <li>© 2016 BAIRONG.IO</li>
              <li><a href="http://facebook.com/Tivix"><i className="fa fa-facebook-square"/></a></li>
              <li><a href="http://github.com/Tivix"><i className="fa fa-github"/></a></li>
              <li><a href="https://www.twitter.com/tivix" target="_blank"><i className="fa fa-twitter"/></a></li>
              <li><a href="https://www.linkedin.com/company/599476/" target="_blank"><i className="fa fa-linkedin"/></a></li>
              <li><a href="/blog"><i className="tvx tvx-blog"/></a></li>
              <li><a href="/blog/feed/"><i className="fa fa-rss"/></a></li>
            </ul>
          </div>
        </footer>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
//# sourceMappingURL=footer.jsx.map