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

var _tasks = {};

/**
 * Create a Task item (blank)
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _tasks[id] = {
    id: id,
    elapsed: 0,
    running: 0,
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
  console.log('here');
  delete _tasks[id];
}


var AppStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Tasks.
   * @return {object}
   */
  getAllTasks: function() {
    return _tasks;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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
        AppStore.emitChange();
      }
      break;

    case AppConstants.TASK_START:
      AppStore.emitChange();
      break;

    case AppConstants.TASK_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        AppStore.emitChange();
      }
      break;

    case AppConstants.TASK_DESTROY:
      console.log(action.id);
      destroy(action.id);
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;