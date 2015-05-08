var React = require('react');
var Tasklist = require('./Tasklist.jsx');
var Timer = require('./Timer.jsx');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions.js');

function getAppState() {
    return {
        currentTaskTimer: null,
        currentTaskStart: null,
        currentTaskElapsed: 0,
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

    handleTimerClick: function(e){
        AppActions.create('New task');
    },

    render: function() {
        return (
            <div>
                <Tasklist allTasks={this.state.allTasks} />
                <Timer onClick={this.handleTimerClick} />
            </div>
        )
    }
});

module.exports = App;