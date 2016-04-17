"use strict";
const React = require('react');
class About extends React.Component {
    render() {
        return (<div id="static">
      <div className="static-body" id="contact">
                <header>
                    <h1 className="static-title">What can we build for you?</h1></header>
                <section>
                    <div className="form">
                        <div className="wufoo-form"/>
                    </div>
                    <div className="offices">
                        <ul>
                            <li><strong>Tivix - Silicon Valley</strong>
                                <br /> <a className="link-plain" href="https://www.google.com/maps/place/2845 California Street+San Francisco+CA+94115+" target="_blank">2845 California Street</a>
                                <br /> San Francisco, CA 94115
                                <br /> + 1 (415) 680-1299
                                <br /> <a href="mailto:connect@tivix.com">connect@tivix.com</a>
                                <br />
                                <div className="gradient-overlay"></div>
                            </li>
                            <li><a href="https://github.com/tivix" target="_blank"><i className="icon github"/></a> <a href="https://www.facebook.com/tivix" target="_blank"><i className="icon facebook"/></a>
                                <a href="https://www.twitter.com/tivix" target="_blank"><i className="icon twitter"/></a> <a href="https://www.linkedin.com/company/599476/" target="_blank"><i className="icon linkedin"/></a></li>
                        </ul>
                    </div>
                </section>
                <div id="map"></div>
            </div>
            </div>);
    }
}
module.exports = About;
//# sourceMappingURL=index.jsx.map