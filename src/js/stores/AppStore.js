/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TaskStore
 */

var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var START_EVENT = 'start';

var _tasks = {};
var _timerStart = null;



/**
 * Create a Task item (blank)
 * @param  {string} text The content of the TODO
 */

function stopAll(){
    // Stop any currently running task
    for (var key in _tasks) {
        _tasks[key] = assign({}, _tasks[key], {running:0});
    };
}

function create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    stopAll();

    // Create new task
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _tasks[id] = {
        id: id,
        running: 1,
        elapsed: 0,
        text: text
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _tasks[id] = assign({}, _tasks[id], updates);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _tasks[id];
}

function start(id){
    stopAll();
    update(id, {running:1});
}


var AppStore = assign({}, EventEmitter.prototype, {

    getActiveTask: function(){
        for (var key in _tasks) {
            console.log(_tasks[key])
            if(_tasks[key].running){
                return _tasks[key];
            }
        }

        return null;
    },

    hasActiveTask: function(){
        for (var key in _tasks) {
            if(_tasks[key].running){
                return true;
            }
        }

        return null;
    },

    /**
     * Get the entire collection of Tasks.
     * @return {object}
     */
    getAllTasks: function() {
        return _tasks;
    },

    emitTaskChange: function() {
        this.emit(CHANGE_EVENT);
    },

    emitTaskStart: function(id) {
        this.emit(START_EVENT, id);
    },

    /**
     * @param {function} callback
     */
    addTaskChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeTaskChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addTaskStartListener: function(callback) {
        this.on(START_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeTaskStartListener: function(callback) {
        this.removeListener(START_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case AppConstants.TASK_CREATE:
            text = action.text.trim();

            if (text !== '') {
                create(text);
                AppStore.emitTaskChange();
            }

            break;

        case AppConstants.TASK_START:
            start(action.id);
            AppStore.emitTaskChange();

            break;

        case AppConstants.TASK_STOP:
            update(action.id, {elapsed: action.elapsed, running: 0});
            AppStore.emitTaskChange();

            break;

        case AppConstants.TASK_UPDATE_TEXT:
            text = action.text.replace(/^\s+|\s+$/g, '').trim();

            if (text !== '') {
                update(action.id, {text: text});
                AppStore.emitTaskChange();
            }

            break;

        case AppConstants.TASK_DESTROY:
            destroy(action.id);
            AppStore.emitTaskChange();

            break;

        default:
            // no op
    }
});

module.exports = AppStore;