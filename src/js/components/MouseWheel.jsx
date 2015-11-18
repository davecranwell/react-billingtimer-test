var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var MouseWheel = React.createClass({
    propTypes: {
        upCallback: React.PropTypes.func,
        downCallaback: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            upCallback: function() {},
            downCallback: function() {}
        };
    },

    componentDidMount: function() {
        this.refs.wrapper.addEventListener('wheel', this._onScrollHandler, false);
    },

    componentWillUnmount: function() {
        this.refs.wrapper.removeEventListener('wheel', this._onScrollHandler, false);
    },

    _onScrollHandler: function (e) {
        var elem = this.refs.wrapper;
        var wheelDelta = e.deltaY;
        var isDeltaPositive = wheelDelta > 0;

        if (isDeltaPositive) {
            this.props.downCallback();
        } else {
            this.props.upCallback();
        }
    },

    render: function() {
        return <span ref="wrapper">{this.props.children}</span>;
    }
});

module.exports = MouseWheel;