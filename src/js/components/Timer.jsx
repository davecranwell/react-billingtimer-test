var React = require('react');
var AppActions = require('../actions/AppActions');

var Stopwatch = React.createClass({
    getInitialState: function(){
        return { elapsed: 0 };
    },

    render: function() {
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);    

        return (
            <div class="timer-wrapper">
                <button onClick={this.props.onClick}>{seconds}</button>
            </div>
        )
    }
});

module.exports = Stopwatch;