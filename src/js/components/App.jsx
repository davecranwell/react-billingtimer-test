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
        AppStore.addTaskChangeListener(this._onChange);
        AppStore.addTaskStartListener(this._onStart);
    },

    componentWillUnmount: function() {
        AppStore.removeTaskChangeListener(this._onChange);
    },

    tick: function(){
        this.setState({currentTaskElapsed: new Date() - this.state.currentTaskStart});
    },

    _onStart: function(newId){
        var allTasks = this.state.allTasks;

        for (var key in allTasks) {
            if(allTasks[key].running && allTasks[key].id != newId){
                clearInterval(this.state.currentTaskTimer);
                this.setState({currentTaskTimer: null});

                AppActions.stop(allTasks[key].id, this.state.currentTaskElapsed);
            }
        }
        this.setState({currentTaskTimer: setInterval(this.tick, 100)})
    },

    _onChange: function(){
        this.setState(getAppState());
    },

    render: function() {
        return (
            <div>
                <Tasklist allTasks={this.state.allTasks} />
                <Timer />
            </div>
        )
    }
});

module.exports = App;