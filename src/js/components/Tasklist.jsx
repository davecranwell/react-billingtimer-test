var React = require('react');
var Task = require('./Task.jsx');

var Tasklist = React.createClass({
    render: function() {
        if (Object.keys(this.props.allTasks).length < 1) {
            return null;
        }

        var allTasks = this.props.allTasks;
        var tasks = [];

        for (var key in allTasks) {
            tasks.push(<Task key={key} task={allTasks[key]} />);
        }

        return (
            <ul>
                <li>{tasks}</li>
            </ul>
        )
    }
});

module.exports = Tasklist;