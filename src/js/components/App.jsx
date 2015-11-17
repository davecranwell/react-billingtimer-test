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
    },

    componentWillUnmount: function() {
        AppStore.removeTaskChangeListener(this.onAppChange);
    },

    onAppChange: function(){
        this.setState(getAppState());
    },

    handleTimerToggle: function(elapsed){
        console.log('handleTimerToggle clicked', elapsed);

        if(this.state.activeTask){
            AppActions.stop(this.state.activeTask.id, elapsed);
        } else {
            console.log('creating a new task');
            AppActions.create('New task');
        }
    },

    render: function() {
        console.log('App has active task', this.state.hasActiveTask);

        return (
            <div>
                <Tasklist allTasks={this.state.allTasks} />
                <Timer onToggle={this.handleTimerToggle} active={this.state.hasActiveTask} elapsed={this.state.activeTask && this.state.activeTask.elapsed} />
            </div>
        )
    }
});

module.exports = App;