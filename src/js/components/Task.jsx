var React = require('react');
var AppStore = require('../stores/AppStore');
var TextInput = require('./TextInput.jsx');
var AppActions = require('../actions/AppActions.js');

var Task = React.createClass({
    getInitialState: function(){
        return { 
            name: "New task",
            elapsed: 0,
            running: 0,
            start: null
        }
    },

    componentDidMount: function() {
        //AppStore.addTaskStartListener(this._startEventHandler);

        this.start();
    },

    componentWillUnmount: function() {
        //AppStore.removeTaskStartListener(this._startEventHandler);
    },

    // _startEventHandler: function(id){
    //     console.log('started task', id);
    //     console.log('i am task', this.props.task.id);

    //     // ignore start events from self
    //     if(id != this.props.task.id){
    //         this.stop();
    //     }
    // },

    // tick: function(){
    //     this.setState({elapsed: new Date() - this.state.start});
    // },

    toggle: function(e){
        if(this.state.running){
            this.stop();
        }else{
            this.start();
        }
    },

    start: function(){
        var alreadyElapsed = this.state.elapsed;

        this.setState({running: 1});

        AppActions.start(this.props.task.id);

        this.props.onStart(this.props.task.id);

        //console.log('starting task', this.props.task.id)
    },

    stop: function(){
        // clearInterval(this.state.timer);
        this.setState({running: 0, timer: null});


        // console.log('trying to stop', this.props.task.id);
        //AppActions.stop(this.props.task.id, this.state.elapsed);
    },

    destroy: function(){
        this.stop();
        //AppActions.destroy(this.props.task.id);
    },

    updateName: function(e){
        var newText = event.target.value.replace(/^\s+|\s+$/g, '')

        if(newText.length){
            this.setState({name: newText});
        }

        //AppActions.updateName(this.props.task.id, newText);
    },

    render: function() {
        return (
            <div>
                <TextInput onSave={this.updateName} />
                <div onClick={this.toggle}>
                    <div>id: {this.props.task.id}</div>
                    <div>name: {this.state.name}</div>
                    <div>elapsed: {this.state.elapsed}</div>
                    <div>running: {this.state.running}</div>
                </div>
                <button onClick={this.destroy}>Delete</button>
            </div>
        )
    }
});

module.exports = Task;