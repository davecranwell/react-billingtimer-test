var React = require('react');
var TextInput = require('./TextInput.jsx');
var TimeInSeconds = require('./TimeInSeconds.jsx');
var MouseWheel = require('./MouseWheel.jsx');
var AppActions = require('../actions/AppActions.js');


var Task = React.createClass({
    updateName: function(text){
        AppActions.updateName(this.props.task.id, text);
    },

    shouldComponentUpdate: function(newProps, newState) {
        return this.props.task !== newProps.task;
    },

    handleMouseUp: function() {
        AppActions.incrementTimeByMinute(this.props.task.id);
        console.log('up');
    },

    handleMouseDown: function(){
        AppActions.decrementTimeByMinute(this.props.task.id);
        console.log('down');
    },

    render: function() {
        return (
            <div>
                <TextInput onSave={this.updateName} />
                <div onClick={this.props.onToggle}>
                    <div>id: {this.props.task.id}</div>
                    <div>text: {this.props.task.text}</div>
                    <div>elapsed: <MouseWheel upCallback={this.handleMouseUp} downCallback={this.handleMouseDown}><TimeInSeconds seconds={this.props.task.elapsed} /></MouseWheel></div>
                    <div>running: {this.props.task.running}</div>
                </div>
                <button onClick={this.destroy}>Delete</button>
            </div>
        )
    }
});

module.exports = Task;