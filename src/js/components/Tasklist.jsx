var React = require('react');
var Task = require('./Task.jsx');
var AppActions = require('../actions/AppActions.js');

var Tasklist = React.createClass({
    start: function(taskState){
        console.log('STARTING!')
        AppActions.start(taskState.id);
    },

    render: function() {
        if (Object.keys(this.props.allTasks).length < 1) {
            return null;
        }

        var allTasks = this.props.allTasks;
        var tasks = [];

        for (var key in allTasks) {
            tasks.push(<Task key={key} task={allTasks[key]} onStart={this.start} />);
        }

        return (
            <ul>
                <li>{tasks}</li>
            </ul>
        )
    }
});

module.exports = Tasklist;