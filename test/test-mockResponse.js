/**
 * Test: test-mockResponse
 *
 *   Test cases for the <mockResponse> module.
 */

var httpMocks = require('../lib/http-mock');
var EventEmitter = require('events').EventEmitter;

exports['object - Simple verification'] = function (test) {
  var response = httpMocks.createResponse();

  response.send("Hello", 'utf8');
  response.send("World");
  test.equal("HelloWorld", response._getData());
  test.ok(response._isUTF8());
  test.ok(!response._isEndCalled());
  test.done();
};

exports['object - Data Initialization'] = function (test) {
  var response = httpMocks.createResponse();
  test.equal(-1, response.statusCode);
  test.equal("", response._getData());
  test.ok(!response._isUTF8());
  test.ok(!response._isEndCalled());
  test.done();
};

exports['end - Simple Verification'] = function (test) {
  var response = httpMocks.createResponse();

  response.send("Hello");
  response.end("World");

  test.equal("HelloWorld", response._getData());

  test.ok(response._isEndCalled());
  test.done();
};

exports['end - No Data Called'] = function (test) {
  var response = httpMocks.createResponse();

  response.end("Hello World");

  test.equal("Hello World", response._getData());

  test.ok(response._isEndCalled());
  test.done();
};

exports['write - Simple verification'] = function (test) {
  var response = httpMocks.createResponse();

  response.write("Hello", 'utf8');
  response.end("World");

  test.equal("HelloWorld", response._getData());

  test.ok(response._isUTF8());
  test.ok(response._isEndCalled());
  test.done();
};

exports['setHeader - Simple verification'] = function (test) {
  var response = httpMocks.createResponse();

  response.setHeader('foo', 'bar');
  response.setHeader('bling', 'blang');

  test.equal('bar', response.getHeader('foo'));
  test.equal('blang', response.getHeader('bling'));

  response.removeHeader('bling');
  test.ok(!response.getHeader('bling'));

  test.done();
};

exports['setHeader - Can not call after end'] = function (test) {
  var response = httpMocks.createResponse();

  var body = 'hello world';
  response.end(body);

  test.throws(function () {
    response.setHead('Content-Length', body.length);
  });
  test.done();
};

exports['writeHead - Simple verification'] = function (test) {
  var response = httpMocks.createResponse();

  var body = 'hello world';
  response.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });
  response.end(body);

  test.equal(200, response._getStatusCode());
  test.equal(body, response._getData());
  test.ok(response._isDataLengthValid());
  test.ok(response._isEndCalled());
  test.ok(!response._isJSON());
  test.done();
};

exports['writeHead - Can not call after end'] = function (test) {
  var response = httpMocks.createResponse();

  var body = 'hello world';
  response.end(body);

  test.throws(function () {
    response.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    });
  });
  test.done();
};

exports['status - Set the status code'] = function (test) {
  var response = httpMocks.createResponse();
  response.status(401);
  test.equal(401, response._getStatusCode());
  test.done();
};

exports['send - Status code at the beginning'] = function (test) {
  var s = 123;
  var t = 'This is a weird status code';

  var response = httpMocks.createResponse();
  response.send(s, t);

  test.equal(s, response._getStatusCode());
  test.equal(t, response._getData());
  test.done();
};

exports['send - Status code at the end'] = function (test) {
  var s = 543;
  var t = 'This is a weird status code';

  var response = httpMocks.createResponse();
  response.send(t, s);

  test.equal(s, response._getStatusCode());
  test.equal(t, response._getData());
  test.done();
};

exports['implement - WriteableStream'] = function (test) {
  var response = httpMocks.createResponse();
  test.equal(typeof (response.writable), 'function');
  test.equal(typeof (response.destroy), 'function');
  test.equal(typeof (response.destroySoon), 'function');
  test.done();
};

exports['implement - EventEmitter'] = function (test) {
  var response = httpMocks.createResponse();
  test.equal(typeof (response.addListener), 'function');
  test.equal(typeof (response.on), 'function');
  test.equal(typeof (response.once), 'function');
  test.equal(typeof (response.removeListener), 'function');
  test.equal(typeof (response.removeAllListeners), 'function');
  test.equal(typeof (response.setMaxListeners), 'function');
  test.equal(typeof (response.listeners), 'function');
  test.equal(typeof (response.emit), 'function');
  test.done();
};

exports['cookies - Cookies creation'] = function (test) {
  var response = httpMocks.createResponse();
  test.deepEqual(response.cookies, {});
  test.done();
};

exports['cookies - Cookies assignment'] = function (test) {
  var response = httpMocks.createResponse();
  response.cookie("egg", "chicken", {
    maxAge: 1000
  });
  test.deepEqual(response.cookies, {
    egg: {
      value: 'chicken',
      options: {
        maxAge: 1000
      }
    }
  });
  test.done();
};

exports['cookies - Cookie deletion'] = function (test) {
  var response = httpMocks.createResponse();
  response.cookie("egg", "chicken", {
    maxAge: 1000
  });
  response.clearCookie("egg");
  test.deepEqual(response.cookies, {});
  test.done();
};

exports['redirect - Redirect to a url with response code'] = function (test) {
  var response = httpMocks.createResponse();
  var url = '/index';
  var responseCode = 200;
  response.redirect(responseCode, url);
  test.equal(response._getRedirectUrl(), url);
  test.equal(response._getStatusCode(), responseCode);
  test.done();
};

exports['redirect - Redirect to a url without response code'] = function (test) {
  var response = httpMocks.createResponse();
  var url = '/index';
  response.redirect(url);
  test.equal(response._getRedirectUrl(), url);
  test.done();
};

exports['render - Render to a view with data'] = function (test) {
  var response = httpMocks.createResponse();
  var view = 'index';
  var data = {
    'name': 'bob'
  };
  var callback = function () {};
  response.render(view, data, callback);
  test.equal(response._getRenderView(), view);
  test.deepEqual(response._getRenderData(), data);
  test.done();
};

exports['render - Render to a view without data'] = function (test) {
  var response = httpMocks.createResponse();
  var view = 'index';
  var callback = function () {};
  response.render(view, callback);
  test.equal(response._getRenderView(), view);
  test.done();
};

exports['json - Without status code'] = function (test) {
  var response = httpMocks.createResponse(),
    data = {
      hello: 'there'
    };

  response.json(data);
  test.equal(response._isJSON(), true);
  test.equal(response._getData(), JSON.stringify(data));
  test.equal(response.statusCode, 200);
  test.done();
};

exports['json - With status code'] = function (test) {
  var response = httpMocks.createResponse(),
    data = {
      hello: 'there'
    };
  response.json(201, data);
  test.equal(response._isJSON(), true);
  test.equal(response._getData(), JSON.stringify(data));
  test.equal(response.statusCode, 201);
  test.done();
};

exports['json - With status code reverse'] = function (test) {
  var response = httpMocks.createResponse(),
      data = {
          hello: 'there'
      };

  response.json(data, 201);
  test.equal(response._isJSON(), true);
  test.equal(response._getData(), JSON.stringify(data));
  test.equal(response.statusCode, 201);
  test.done();
};

exports['events - end'] = function (test) {
  var response = httpMocks.createResponse({
    eventEmitter: EventEmitter
  });

  response.on('end', function () {
    test.ok(response._isEndCalled());
    test.done();
  });

  response.end();
};

exports['events - send'] = function (test) {
  var response = httpMocks.createResponse({
    eventEmitter: EventEmitter
  });

  response.on('send', function () {
    test.equal(response.statusCode, 200);
    test.done();
  });

  response.send(200);
};

exports['events - render'] = function (test) {
  var response = httpMocks.createResponse({
    eventEmitter: EventEmitter
  });
  var view = 'index';
  var data = {
    'name': 'bob'
  };
  var callback = function () {};

  response.on('render', function () {
    test.equal(response._getRenderView(), view);
    test.deepEqual(response._getRenderData(), data);
    test.done();
  });

  response.render(view, data, callback);
};


exports['send - sending response objects a.k.a restifyError with statusCode'] = function(test) {
  var errors = require('node-restify-errors')
  var response = httpMocks.createResponse();
  response.send(409, new errors.InvalidArgumentError("I just dont like you"));

  test.equal(409, response._getStatusCode());
  test.equal('InvalidArgument', response._getData().code);
  test.equal('I just dont like you', response._getData().message);
  test.done();
};

exports['send - sending response objects a.k.a restifyError without statusCode'] = function(test) {
  var errors = require('node-restify-errors')
  var response = httpMocks.createResponse();
  response.send(new errors.InvalidArgumentError("I just dont like you"));

  test.equal(409, response._getStatusCode());
  test.equal('InvalidArgument', response._getData().code);
  test.equal('I just dont like you', response._getData().message);
  test.done();
};
