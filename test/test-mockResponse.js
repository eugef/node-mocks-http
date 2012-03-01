/**
 * Test: test-mockResponse
 *
 *   Test cases for the <mockResponse> module.
 */

var httpMocks = require('../lib/http-mock');

exports['object - Simple verification'] = function( test ) {
    var response = httpMocks.createResponse();
    
    response.send("Hello", 'utf8');
    response.send("World");
    test.equal("HelloWorld", response._getData());
    test.ok( response._isUTF8());
    test.ok(! response._isEndCalled());
    test.done();
};

exports['object - Data Initialization'] = function( test ) {
    var response = httpMocks.createResponse();
    test.equal(-1, response.statusCode);
    test.equal("", response._getData());
    test.ok( ! response._isUTF8());
    test.ok( ! response._isEndCalled());
    test.done();
};

exports['end - Simple Verification'] = function(test) {
    var response = httpMocks.createResponse();

    response.send("Hello");
    response.end("World");
    
    test.equal("HelloWorld", response._getData());

    test.ok(response._isEndCalled());
    test.done();
};

exports['end - No Data Called'] = function(test) {
    var response = httpMocks.createResponse();

    response.end("Hello World");
    
    test.equal("Hello World", response._getData());

    test.ok(response._isEndCalled());
    test.done();
};

exports['write - Simple verification'] = function( test ) {
    var response = httpMocks.createResponse();
    
    response.write("Hello", 'utf8');
    response.end("World");
    
    test.equal("HelloWorld", response._getData());

    test.ok( response._isUTF8());
    test.ok( response._isEndCalled());
    test.done();
};

exports['setHeader - Simple verification'] = function(test) {
    var response = httpMocks.createResponse();
    
    response.setHeader('foo', 'bar');
    response.setHeader('bling', 'blang');
    
    test.equal('bar', response.getHeader('foo'));
    test.equal('blang', response.getHeader('bling'));

    response.removeHeader('bling');
    test.ok( !response.getHeader('bling'));
    
    test.done();
};

exports['setHeader - Can not call after end'] = function(test) {
    var response = httpMocks.createResponse();
    
    var body = 'hello world';
    response.end(body);
    
    test.throws( function() {
        response.setHead('Content-Length', body.length);
    });
    test.done();
};

exports['writeHead - Simple verification'] = function(test) {
    var response = httpMocks.createResponse();
    
    var body = 'hello world';
    response.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain' });
    response.end(body);
    
    test.equal(200, response._getStatusCode() );
    test.equal(body, response._getData() );
    test.ok(response._isDataLengthValid() );
    test.ok(response._isEndCalled());
    test.ok(! response._isJSON());
    test.done();
};

exports['writeHead - Can not call after end'] = function(test) {
    var response = httpMocks.createResponse();
    
    var body = 'hello world';
    response.end(body);
    
    test.throws( function() {
        response.writeHead(200, {
            'Content-Length': body.length,
            'Content-Type': 'text/plain' });
    });
    test.done();
};

exports['status - Set the status code'] = function(test) {
    var response = httpMocks.createResponse();
    response.status(401);
    test.equal(401, response._getStatusCode());
    test.done();
};

exports['send - Status code at the beginning'] = function(test) {
    var s = 123;
    var t = 'This is a weird status code';
    
    var response = httpMocks.createResponse();
    response.send(s, t);

    test.equal(s, response._getStatusCode());
    test.equal(t, response._getData());
    test.done();
};

exports['send - Status code at the end'] = function(test) {
    var s = 543;
    var t = 'This is a weird status code';
    
    var response = httpMocks.createResponse();
    response.send(t, s);

    test.equal(s, response._getStatusCode());
    test.equal(t, response._getData());
    test.done();
};