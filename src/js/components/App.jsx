var React = require('react');
var Tasklist = require('./Tasklist.jsx');
var Timer = require('./Timer.jsx');
var AppStore = require('../stores/AppStore');


function getAppState() {
    return {
        allTasks: AppStore.getAllTasks()
    };
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
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