var React = require('react');
var ReactDOM = require('react-dom');
var Task = require('./Task.jsx');
var AppActions = require('../actions/AppActions.js');

var Tasklist = React.createClass({
    handlTaskToggle: function(task){
        if(task.running){
            AppActions.stop(task);
        }else{
            AppActions.start(task);
        }
    },

    render: function() {
        if (Object.keys(this.props.allTasks).length < 1) {
            return null;
        }

        var allTasks = this.props.allTasks;
        var tasks = [];

        for (var task in allTasks) {
            tasks.push(<li key={task}><Task onToggle={this.handlTaskToggle.bind(this, task)} task={allTasks[task]} /></li>);
        }

        return (
            <ul>
                {tasks}
            </ul>
        )
    }
});

module.exports = Tasklist;