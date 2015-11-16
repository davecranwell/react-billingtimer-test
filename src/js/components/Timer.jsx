var React = require('react');
var ReactDOM = require('react-dom');
var SecondsTohhmmss = require('../lib/SecondsTohhmmss');

var Stopwatch = React.createClass({
    getInitialState: function(){
        return { 
            elapsed: 0
        };
    },

    componentDidMount: function() {
        this._tick();
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    _tick: function() {
        var self = this;

        this.interval = setInterval(function() {
            if (!self.props.active) {
                self.interval = undefined;
                return;
            }
            
            self.setState({elapsed: self.state.elapsed + 1});
        }, 1000);
    },

    onToggle: function(){
        this.props.onToggle(this.state.elapsed);
    },

    render: function() {
        var time = SecondsTohhmmss(this.state.elapsed);

        return (
            <div className="timer-wrapper">
                <button onClick={this.onToggle}>{time}</button>
            </div>
        )
    }
});

module.exports = Stopwatch;