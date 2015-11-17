var React = require('react');
var ReactDOM = require('react-dom');
var Tasklist = require('./Tasklist.jsx');
var TimeInSeconds = require('./TimeInSeconds.jsx');
var Interval = require('./Interval.jsx');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions.js');

function getAppState() {
    return {
        hasActiveTask: AppStore.hasActiveTask(),
        activeTask: AppStore.getActiveTask(),
        allTasks: AppStore.getAllTasks(),
        activeTaskElapsed: 0
    };
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },

    componentDidMount: function() {
        AppStore.addTaskChangeListener(this.onAppChange);
    },

    componentWillUnmount: function() {
        AppStore.removeTaskChangeListener(this.onAppChange);
    },

    onAppChange: function(){
        var state = getAppState();

        this.setState(state);
        this.setState({
            activeTaskElapsed: (state.hasActiveTask ? state.activeTask.elapsed : 0)
        })
    },

    handleButtonClick: function(){
        if (this.state.hasActiveTask) {
            AppActions.stop(this.state.activeTask.id, this.state.activeTaskElapsed);
        } else {
            AppActions.create('New task');
        }
    },

    handleTimerUpdate: function() {
        AppActions.updateTime(this.state.activeTask.id, (this.state.activeTaskElapsed + 1));
    },

    handleTaskToggle: function(task) {
        if (this.state.activeTask && task !== this.state.activeTask) {
            // If there is a running task but the task toggled isn't it, s
            // stop the running task, and start the chosen one and reset 
            // the set internal elapsed clocked
            AppActions.stop(this.state.activeTask.id, this.state.activeTaskElapsed);
            AppActions.start(task.id);
        } else if (this.state.activeTask && task == this.state.activeTask) {
            // If there's a running task which is the one clicked, stop it, 
            // recording time and reset internal active task clock
            AppActions.stop(task.id, this.state.activeTaskElapsed);
        } else {
            // If there is no running task, start the chosen task while setting
            // internal clock to task elapsed time
            AppActions.start(task.id);
        }
    },

    render: function() {
        if (this.state.hasActiveTask) {
            buttonVal = <TimeInSeconds seconds={this.state.activeTaskElapsed} />
        } else {
            buttonVal = "Start";
        }

        return (
            <div>
                <Interval callback={this.handleTimerUpdate} enabled={this.state.hasActiveTask} timeout={1000} />
                <Tasklist allTasks={this.state.allTasks} onToggle={this.handleTaskToggle} />
                <button onClick={this.handleButtonClick}>{buttonVal}</button>
            </div>
        )
    }
});

module.exports = App;