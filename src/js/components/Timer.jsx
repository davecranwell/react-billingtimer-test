var React = require('react');
var ReactDOM = require('react-dom');
var SecondsTohhmmss = require('../lib/SecondsTohhmmss');

var Timer = React.createClass({
    getInitialState: function(){
        return { 
            elapsed: 0,
            active: false
        };
    },

    componentDidMount: function() {
        if (this.props.active) {
            this.setState({
                active: true
            });

            this._tick();   
        }            
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    componentWillReceiveProps: function(newProps) {
        console.log('receiving props', newProps);
        
        clearInterval(this.interval);

        console.log(newProps.active);

        this.setState({
            elapsed: 0,
            active: newProps.active
        });

        this._tick();
    },

    _tick: function() {
        console.log(this.state.active);
        if (this.state.active) {
            this.interval = setInterval(function() {                
                this.setState({elapsed: this.state.elapsed + 1});
            }.bind(this), 1000);
        }
    },

    handleClick: function(){
        this.props.onToggle(this.state.elapsed);
    },

    render: function() {
        var buttonVal;

        if (this.state.active) {
            buttonVal = SecondsTohhmmss(this.state.elapsed);
        } else { 
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