'use strict';

var EventEmitter = require('events').EventEmitter;

var mixin = require('merge-descriptors');

var application = require('./mockApplication');
var request = require('./mockRequest');
var response = require('./mockResponse');

exports = module.exports = createApplication;

function createApplication() {
  var app = function() {};

  mixin(app, EventEmitter.prototype, false);
  mixin(app, application, false);

  app.request = {
    __proto__: request,
    app: app
  };
  app.response = {
    __proto__: response,
    app: app
  };
  app.init();
  return app;
}

exports.application = application;
exports.request = request;
exports.response = response;
