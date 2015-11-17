var React = require('react');
var ReactDOM = require('react-dom');
var SecondsTohhmmss = require('../lib/SecondsTohhmmss');

var Timer = React.createClass({
    propTypes: {
        onToggle: React.PropTypes.func,
        onUpdate: React.PropTypes.func,
        active: React.PropTypes.bool,
        elapsed: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            onToggle: function(){},
            onUpdate: function(){},
            active: false,
            elapsed: 0
        };
    },

    getInitialState: function(){
        return {
            onToggle: this.props.onToggle,
            active: this.props.active,
            elapsed: this.props.elapsed  
        };
    },

    componentDidMount: function() {
        if (this.props.active) {
            this.setState({
                active: true
            });
        }     
    },

    componentWillMount: function() {
        this.interval = null;
    },

    componentWillUnmount: function() {
        this._stop();
    },

    componentWillReceiveProps: function(newProps) {    
        this._start();

        this.setState({
            elapsed: newProps.elapsed,
            active: newProps.active
        });
    },

    _callback: function() {
        var newElapsed = this.state.elapsed + 1;

        this.setState({elapsed: newElapsed});
        this.props.onUpdate(newElapsed);
        this._start();
    },

    _start: function() {
        this._stop();

        this.interval = setTimeout(this._callback, 1000)
    },

    _stop: function() {
        clearTimeout(this.interval);
    },

    handleClick: function(){
        this.props.onToggle(this.state.elapsed);
    },

    render: function() {
        var buttonVal;

        if (this.state.active) {
            this._start();
            buttonVal = SecondsTohhmmss(this.state.elapsed);
        } else {
            this._stop();
            buttonVal = "Start";
        }

        return (
            <div className="timer-wrapper">
                <button onClick={this.handleClick}>{buttonVal}</button>
            </div>
        )
    }
});

module.exports = Timer;