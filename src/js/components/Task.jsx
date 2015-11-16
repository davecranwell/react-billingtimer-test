var React = require('react');
var ReactDOM = require('react-dom');
var TextInput = require('./TextInput.jsx');
var AppActions = require('../actions/AppActions.js');

var Task = React.createClass({
    updateName: function(text){
        AppActions.updateName(this.props.task.id, text);
    },

    render: function() {
        return (
            <div>
                <TextInput onSave={this.updateName} />
                <div onClick={this.props.onToggle}>
                    <div>id: {this.props.task.id}</div>
                    <div>text: {this.props.task.text}</div>
                    <div>elapsed: {this.props.task.elapsed}</div>
                    <div>running: {this.props.task.running}</div>
                </div>
                <button onClick={this.destroy}>Delete</button>
            </div>
        )
    }
});

module.exports = Task;