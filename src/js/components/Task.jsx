var React = require('react');
var AppStore = require('../stores/AppStore');
var TextInput = require('./TextInput.jsx');
var AppActions = require('../actions/AppActions.js');

var Task = React.createClass({
    getInitialState: function(){
        return { 
            name: "New task",
            elapsed: 0,
            running: 0,
            start: null,
            timer: null
        }
    },

    componentDidMount: function() {
        this.start();
        AppStore.addChangeListener(this._changeHandler);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._changeHandler);
    },

    _changeHandler: function(e){
        this.stop();
    },

    tick: function(){
        this.setState({elapsed: new Date() - this.state.start});
    },

    toggle: function(e){
        if(this.state.running){
            this.stop();
        }else{
            this.start();
        }
    },

    start: function(){
        var alreadyElapsed = this.state.elapsed;

        this.setState({
            running: 1, 
            start: new Date() - alreadyElapsed,
            timer: setInterval(this.tick, 100)
        });
    },

    stop: function(){
        clearInterval(this.state.timer);
        this.setState({running: 0, timer: null});
    },

    delete: function(){
        this.stop();
        console.log(this.props.task);
        AppActions.destroy(this.props.task.id);
    },

    updateName: function(e){
        var newText = event.target.value.replace(/^\s+|\s+$/g, '')

        if(newText.length){
            console.log('new text', newText);
            this.setState({name: event.target.value});
        }
    },

    render: function() {
        return (
            <div>
                <TextInput onSave={this.updateName} />
                <div onClick={this.toggle}>
                    <div>name: {this.state.name}</div>
                    <div>elapsed: {this.state.elapsed}</div>
                    <div>running: {this.state.running}</div>
                </div>
                <button onClick={this.delete}>Delete</button>
            </div>
        )
    }
});

module.exports = Task;