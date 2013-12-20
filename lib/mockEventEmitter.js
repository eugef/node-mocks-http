/*
 * http://nodejs.org/api/events.html
 */

function EventEmitter() {}

EventEmitter.prototype.addListener = function (event, listener) {};
EventEmitter.prototype.on = function (event, listener) {};
EventEmitter.prototype.once = function (event, listener) {};
EventEmitter.prototype.removeListener = function (event, listener) {};
EventEmitter.prototype.removeAllListeners = function (event) {};
// EventEmitter.prototype.removeAllListeners = function([event])
EventEmitter.prototype.setMaxListeners = function (n) {};
EventEmitter.prototype.listeners = function (event) {};
EventEmitter.prototype.emit = function (event) {};
// EventEmitter.prototype.emit = function(event, [arg1], [arg2], [...]){}

module.exports = EventEmitter;