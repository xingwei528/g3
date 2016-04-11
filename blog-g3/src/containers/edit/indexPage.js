"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const components_1 = require('../../lib/components');
const client_1 = require('../../lib/client');
class ContentsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }
    componentDidMount() {
        client_1.default.request.get('http://localhost:9393/test', null, (err, data, status) => {
            this.setState({
                data: data
            });
        });
    }
    render() {
        if (!this.state.data)
            return React.createElement(components_1.InnerLoading, null);
        return (React.createElement("div", null, this.state.data));
    }
}
function mapStateToProps(state) {
    return {
        authState: state.authState,
        orgState: state.orgState
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(ContentsPage);
//# sourceMappingURL=indexPage.js.map