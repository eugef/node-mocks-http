'use strict';

var accepts = require('accepts');
var typeis = require('type-is');
var parseRange = require('range-parser');
var parse = require('parseurl');

var http = require('./node/http');

var req = exports = module.exports = {
  __proto__: http.IncomingMessage.prototype
};

req.header = function(name) {
  switch (name = name.toLowerCase()) {
    case 'referer':
    case 'referrer':
      return this.headers.referrer || this.headers.referer;
    default:
      return this.headers[name];
  }
};

req.get = req.header;

req.accepts = function() {
  var accept = accepts(this);
  return accept.types.apply(accept, arguments);
};

req.acceptsEncodings = function(){
  var accept = accepts(this);
  return accept.encodings.apply(accept, arguments);
};

req.acceptsEncoding = req.acceptsEncodings;

req.acceptsCharsets = function(){
  var accept = accepts(this);
  return accept.charsets.apply(accept, arguments);
};

req.acceptsCharset = req.acceptsCharsets;

req.acceptsLanguages = function(){
  var accept = accepts(this);
  return accept.languages.apply(accept, arguments);
};

req.acceptsLanguage = req.acceptsLanguages;

req.range = function(size){
  var range = this.get('Range');
  if (!range) return;
  return parseRange(size, range);
};

req.param = function param(name, defaultValue) {
  var params = this.params || {};
  var body = this.body || {};
  var query = this.query || {};

  var args = arguments.length === 1 ? 'name' : 'name, default';

  if (null != params[name] && params.hasOwnProperty(name)) {
  	return params[name];
  }
  if (null != body[name]) {
  	return body[name];
  }
  if (null != query[name]) {
  	return query[name];
  }

  return defaultValue;
};

req.is = function(types) {
  if (!Array.isArray(types)) {
  	types = [].slice.call(arguments);
  }
  return typeis(this, types);
};

defineGetter(req, 'protocol', function protocol() {
  var proto = this.options.proto;
  proto = this.get('X-Forwarded-Proto') || proto;
  return proto.split(/\s*,\s*/)[0];
});

defineGetter(req, 'secure', function secure(){
  return 'https' == this.protocol;
});

defineGetter(req, 'ip', function ip(){
  return this.options.ip;
});

defineGetter(req, 'subdomains', function subdomains() {
  var hostname = this.hostname;

  if (!hostname) return [];

  var offset = this.app.get('subdomain offset');
  var subdomains = !isIP(hostname) ? hostname.split('.').reverse() : [hostname];

  return subdomains.slice(offset);
});

defineGetter(req, 'path', function path() {
  return parse(this).pathname;
});

defineGetter(req, 'hostname', function hostname() {
  var host = this.get('X-Forwarded-Host');

  if (!host) {
    host = this.get('Host');
  }

  if (!host) {
  	return;
  }

  var offset = host[0] === '[' ? host.indexOf(']') + 1 : 0;
  var index = host.indexOf(':', offset);

  return ~index ? host.substring(0, index) : host;
});

defineGetter(req, 'host', function host() {
  return this.hostname;
});

defineGetter(req, 'fresh', function(){
  var method = this.method;
  var statusCode = this.res.statusCode;

  if ('GET' !== method && 'HEAD' !== method) {
  	return false;
  }

  if ((statusCode >= 200 && statusCode < 300) || 304 === statusCode) {
    return fresh(this.headers, (this.res._headers || {}));
  }

  return false;
});

defineGetter(req, 'stale', function stale() {
  return !this.fresh;
});

defineGetter(req, 'xhr', function xhr() {
  var val = this.get('X-Requested-With') || '';
  return val.toLowerCase() === 'xmlhttprequest';
});

function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: true,
    get: getter
  });
};
