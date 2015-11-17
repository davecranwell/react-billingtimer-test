var React = require('react');
var ReactDOM = require('react-dom');
var Tasklist = require('./Tasklist.jsx');
var Timer = require('./Timer.jsx');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions.js');

function getAppState() {
    return {
        hasActiveTask: AppStore.hasActiveTask(),
        activeTask: AppStore.getActiveTask(),
        allTasks: AppStore.getAllTasks()
    };
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },

    componentDidMount: function() {
        AppStore.addTaskChangeListener(this.onAppChange);

        // Create an internal record of the Timer's elapsed time without affecting state
        this.activeTaskElapsed = 0;
    },

    componentWillUnmount: function() {
        AppStore.removeTaskChangeListener(this.onAppChange);
    },

    onAppChange: function(){
        this.setState(getAppState());
    },

    handleTimerToggle: function(elapsed){
        if (this.state.activeTask) {
            AppActions.stop(this.state.activeTask.id, elapsed);
        } else {
            console.log('creating a new task');
            AppActions.create('New task');
        }
    },

    handleTimerUpdate: function(elapsed) {
        this.activeTaskElapsed = elapsed;
        console.log(elapsed);
    },

    handleTaskToggle: function(task) {
        // If the task toggled isn't the running task, stop the running task
        if (this.state.activeTask && task !== this.state.activeTask) {
            console.log('clicked task is NOT active task')
            AppActions.stop(this.state.activeTask.id, this.activeTaskElapsed);
            AppActions.start(task.id);
        } else if (task == this.state.activeTask) {
            console.log('clicked task IS active task')
            AppActions.stop(task.id, this.activeTaskElapsed);
        } else {
            console.log('clicked task was not running when clicked')
            AppActions.start(task.id);
        }
    },

    render: function() {
        return (
            <div>
                <Tasklist 
                    allTasks={this.state.allTasks} 
                    onToggle={this.handleTaskToggle} />
                <Timer
                    onUpdate={this.handleTimerUpdate}
                    onToggle={this.handleTimerToggle}
                    active={this.state.hasActiveTask} 
                    elapsed={this.state.activeTask && this.state.activeTask.elapsed} />
            </div>
        )
    }
});

module.exports = App;