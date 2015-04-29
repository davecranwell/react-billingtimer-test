var React = require('react');

var Tasklist = React.createClass({
    getInitialState: function(){
        return { 
            name: "New task",
            elapsed: 0,
            running: 0,
            start: null,
            timer: null
        }
    },

    tick: function(){
        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed: new Date() - this.state.start});
    },

    toggle: function(e){
        if(this.state.running){
            this.stop();
        }else{
            this.start();
        }
    },

    start: function(e){
        this.setState({
            running: 1, 
            start: new Date(),
            timer: setInterval(this.tick, 50)
        });
    },

    stop: function(e){
        clearInterval(this.state.timer);
        this.setState({running: 0, timer: null});
    },

    render: function() {
        return (
            <div onClick={this.toggle}>
                <input type="text" name="name" />
                <div>name: {this.state.name}</div>
                <div>elapsed: {this.state.elapsed}</div>
                <div>running: {this.state.running}</div>
            </div>
        )
    }
});

module.exports = Tasklist;