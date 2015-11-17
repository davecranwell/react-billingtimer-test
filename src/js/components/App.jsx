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
        // This is dangerous and inconsistent
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
            AppActions.create('New task');
        }
    },

    handleTimerUpdate: function(elapsed) {
        this.activeTaskElapsed = elapsed;
    },

    handleTaskToggle: function(task) {
        if (this.state.activeTask && task !== this.state.activeTask) {
            // If there is a running task but the task toggled isn't it, s
            // stop the running task, and start the chosen one and reset 
            // the set internal elapsed clocked
            AppActions.stop(this.state.activeTask.id, this.activeTaskElapsed);
            AppActions.start(task.id);
            this.activeTaskElapsed = task.elapsed;
        } else if (this.state.activeTask && task == this.state.activeTask) {
            // If there's a running task which is the one clicked, stop it, 
            // recording time and reset internal active task clock
            AppActions.stop(task.id, this.activeTaskElapsed);
            this.activeTaskElapsed = 0
        } else {
            // If there is no running task, start the chosen task while setting
            // internal clock to task elapsed time
            AppActions.start(task.id);
            this.activeTaskElapsed = task.elapsed;
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