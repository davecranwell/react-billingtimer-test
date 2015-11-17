/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/Dispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

    /**
     * @param  {string} text
     */
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TASK_CREATE,
            text: text
        });
    },

    /**
     * @param  {string} id
     */
    start: function(id) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TASK_START,
            id: id
        });
    },

    /**
     * @param  {string} id
     */
    stop: function(id, elapsed) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TASK_STOP,
            id: id,
            elapsed: elapsed
        });
    },

    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateName: function(id, text) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TASK_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    updateTime: function(id, elapsed){
        AppDispatcher.dispatch({
            actionType: AppConstants.TASK_UPDATE_TIME,
            id: id,
            elapsed: elapsed
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TASK_DESTROY,
            id: id
        });
    }
};

module.exports = AppActions;