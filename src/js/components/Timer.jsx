var React = require('react');
var SecondsTohhmmss = require('./SecondsTohhmmss');

var Stopwatch = React.createClass({
    getInitialState: function(){
        return { 
            elapsed: 0 
        };
    },

    componentDidMount: function() {
        this._tick();
    },

    componentDidUpdate: function(){
        console.log('updated');
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
            <div class="timer-wrapper">
                <button onClick={this.onToggle}>{time}</button>
            </div>
        )
    }
});

module.exports = Stopwatch;