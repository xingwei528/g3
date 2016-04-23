"use strict";
const React = require('react');
const sideNav_1 = require("./components/sideNav");
const footer_1 = require("./components/footer");
class App extends React.Component {
    render() {
        return (<div id="homepage">
        <sideNav_1.default />
        <div id="content_container">
          {this.props.children}
          <footer_1.default />
        </div>
      </div>);
    }
}
module.exports = App;
//# sourceMappingURL=app.jsx.map