"use strict";
const React = require("react");
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            isValid: true
        };
    }
    componentWillReceiveProps(nextProps) {
        var isValid = true;
        if (nextProps.isRequired) {
            if (!nextProps.value) {
                isValid = false;
            }
        }
        this.setState({
            value: nextProps.value || '',
            isValid: isValid
        });
    }
    getValue() {
        return this.state.value || '';
    }
    isValid(val) {
        var isValid = true;
        if (typeof (val) === 'boolean') {
            isValid = val;
        }
        else {
            if (this.props.isRequired) {
                if (!this.state.value) {
                    isValid = false;
                }
            }
        }
        this.setState({
            value: this.state.value,
            isValid: isValid
        });
        return isValid;
    }
    onChange(event) {
        this.setState({
            value: event.target.value,
            isValid: true
        });
    }
    onBlur() {
        if (this.props.isRequired) {
            var isValid = true;
            if (!this.state.value) {
                isValid = false;
            }
            this.setState({
                value: this.state.value,
                isValid: isValid
            });
        }
        if (this.props.onChange) {
            this.props.onChange(this.props.name, this.getValue());
        }
    }
    render() {
        var className = this.props.className;
        if (!this.state.isValid) {
            className += " error";
        }
        if (this.props.isMultiple) {
            return React.createElement("textarea", { name: this.props.name, className: className, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange.bind(this), onBlur: this.onBlur.bind(this) });
        }
        else {
            var type = this.props.className.indexOf("password") !== -1 ? "password" : "text";
            return React.createElement("input", { name: this.props.name, type: type, autoComplete: "off", className: className, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange.bind(this), onBlur: this.onBlur.bind(this) });
        }
    }
}
exports.Component = Component;
function getProps(name, value, placeholder, className, isRequired, isMultiple, onChange) {
    if (!className) {
        className = "text";
        if (isMultiple) {
            className = className.replace("text", "textarea");
        }
    }
    return {
        ref: name,
        name: name,
        value: value,
        placeholder: placeholder,
        className: className,
        isRequired: isRequired,
        isMultiple: isMultiple,
        onChange: onChange,
    };
}
exports.getProps = getProps;
function getValue(refs, ref) {
    var element = refs[ref];
    return element ? element.getValue() : "";
}
exports.getValue = getValue;
//# sourceMappingURL=jsxInput.js.map