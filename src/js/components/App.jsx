var React = require('react');
var ReactDOM = require('react-dom');
var Tasklist = require('./Tasklist.jsx');
var Timer = require('./Timer.jsx');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions.js');

function getAppState() {
    return {
        activeTask: AppStore.getActiveTask(),
        isTimerActive: AppStore.isTimerActive(),
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
        if(this.state.isTimerActive){
            AppActions.stop(this.state.activeTask.id, elapsed);
        } else {
            AppActions.create('New task');
        }
    },

    render: function() {
        return (
            <div>
                <Tasklist allTasks={this.state.allTasks} />
                <Timer onToggle={this.handleTimerToggle} active={this.state.isTimerActive} />
            </div>
        )
    }
});

module.exports = App;