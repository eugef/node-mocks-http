'use strict';

var EventEmitter = require('events').EventEmitter;

var mixin = require('merge-descriptors');

var application = require('./mock-application');
var request = require('./mock-request');
var response = require('./mock-response');

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

exports = module.exports = createApplication;

exports.application = application;
exports.request = request;
exports.response = response;
