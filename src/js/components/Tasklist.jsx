var React = require('react');
var Task = require('./Task.jsx');
var AppActions = require('../actions/AppActions.js');

var Tasklist = React.createClass({
    propTypes: {
        allTasks: React.PropTypes.array,
        onToggle: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            allTasks: [],
            onToggle: function(){}
        };
    },

    handleTaskToggle: function(task){
        this.props.onToggle(task);
    },

    render: function() {
        if (Object.keys(this.props.allTasks).length < 1) {
            return null;
        }

        var allTasks = this.props.allTasks;
        var tasks = [];

        for (var task in allTasks) {
            tasks.push(<li key={task}><Task onToggle={this.handleTaskToggle.bind(this, allTasks[task])} task={allTasks[task]} /></li>);
        }

        return (
            <ul>
                {tasks}
            </ul>
        )
    }
});

module.exports = Tasklist;