var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Interval = React.createClass({
    propTypes: {
        callback: React.PropTypes.func.isRequired,
        enabled: React.PropTypes.bool,
        timeout: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            enabled: false,
            timeout: 1000
        };
    },

    getInitialState: function() {
        return {enabled: this.props.enabled};
    },

    componentDidMount: function() {
        if (this.props.enabled) {
            this.start();
        }
    },

    componentWillReceiveProps: function(newProps) {
        this.setState(newProps);
    },

    componentWillUnmount: function() {
        this.stop();
    },

    callback: function() {
        this.props.callback();
        this.start();
    },

    start: function() {
        this.stop();
        this.timer = setTimeout(this.callback, this.props.timeout);
    },

    stop: function() {
        clearTimeout(this.timer);
    },

    render: function() {
        if (this.state.enabled) {
            this.start();
        } else {
            this.stop();
        }
        return false;
    }
});

module.exports = Interval;