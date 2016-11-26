'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var mockResponse = require('../../lib/mockResponse');
var mockRequest = require('../../lib/mockRequest');

describe('mockResponse', function() {

  it('should expose .createResponse()', function() {
    expect(mockResponse.createResponse).to.be.a('function');
  });

  describe('.createResponse()', function() {
    var response;

    before(function() {
      response = mockResponse.createResponse();
    });

    it('should return an object', function() {
      expect(response).to.be.an('object');
    });

    it('should expose Express Response methods', function() {
      expect(response).to.have.property('cookie');
      expect(response.cookie).to.be.a('function');

      expect(response).to.have.property('clearCookie');
      expect(response.clearCookie).to.be.a('function');

      expect(response).to.have.property('status');
      expect(response.status).to.be.a('function');

      expect(response).to.have.property('send');
      expect(response.send).to.be.a('function');

      expect(response).to.have.property('sendStatus');
      expect(response.sendStatus).to.be.a('function');

      expect(response).to.have.property('json');
      expect(response.json).to.be.a('function');

      expect(response).to.have.property('jsonp');
      expect(response.jsonp).to.be.a('function');

      expect(response).to.have.property('contentType');
      expect(response.contentType).to.be.a('function');

      expect(response).to.have.property('type');
      expect(response.type).to.be.a('function');

      expect(response).to.have.property('set');
      expect(response.set).to.be.a('function');

      expect(response).to.have.property('header');
      expect(response.header).to.be.a('function');

      expect(response).to.have.property('get');
      expect(response.get).to.be.a('function');

      // TODO: check origin of setEnconding() method
      expect(response).to.have.property('setEncoding');
      expect(response.setEncoding).to.be.a('function');

      expect(response).to.have.property('redirect');
      expect(response.redirect).to.be.a('function');

      expect(response).to.have.property('render');
      expect(response.render).to.be.a('function');
    });

    it('should expose Node OutgoingMessage methods', function() {
      expect(response).to.have.property('getHeader');
      expect(response.getHeader).to.be.a('function');

      expect(response).to.have.property('setHeader');
      expect(response.setHeader).to.be.a('function');

      expect(response).to.have.property('removeHeader');
      expect(response.removeHeader).to.be.a('function');

      expect(response).to.have.property('write');
      expect(response.write).to.be.a('function');

      expect(response).to.have.property('end');
      expect(response.end).to.be.a('function');
    });

    it('should expose Node ServerResponse methods', function() {
      expect(response).to.have.property('writeHead');
      expect(response.writeHead).to.be.a('function');
    });

    it('should expose Node WritableStream methods', function() {
      expect(response).to.have.property('destroy');
      expect(response.destroy).to.be.a('function');

      expect(response).to.have.property('destroySoon');
      expect(response.destroySoon).to.be.a('function');
    });

    it('should expose Node EventEmitter methods', function() {
      expect(response).to.have.property('addListener');
      expect(response.addListener).to.be.a('function');

      expect(response).to.have.property('on');
      expect(response.on).to.be.a('function');

      expect(response).to.have.property('once');
      expect(response.once).to.be.a('function');

      expect(response).to.have.property('removeListener');
      expect(response.removeListener).to.be.a('function');

      expect(response).to.have.property('removeAllListeners');
      expect(response.removeAllListeners).to.be.a('function');

      expect(response).to.have.property('setMaxListeners');
      expect(response.setMaxListeners).to.be.a('function');

      expect(response).to.have.property('listeners');
      expect(response.listeners).to.be.a('function');

      expect(response).to.have.property('emit');
      expect(response.emit).to.be.a('function');

      expect(response).to.have.property('prependListener');
      expect(response.prependListener).to.be.a('function');
    });

    it('should expose heler methods', function() {
      expect(response).to.have.property('_isEndCalled');
      expect(response._isEndCalled).to.be.a('function');

      expect(response).to.have.property('_getHeaders');
      expect(response._getHeaders).to.be.a('function');

      expect(response).to.have.property('_getData');
      expect(response._getData).to.be.a('function');

      expect(response).to.have.property('_getStatusCode');
      expect(response._getStatusCode).to.be.a('function');

      expect(response).to.have.property('_isJSON');
      expect(response._isJSON).to.be.a('function');

      expect(response).to.have.property('_isUTF8');
      expect(response._isUTF8).to.be.a('function');

      expect(response).to.have.property('_isDataLengthValid');
      expect(response._isDataLengthValid).to.be.a('function');

      expect(response).to.have.property('_getRedirectUrl');
      expect(response._getRedirectUrl).to.be.a('function');

      expect(response).to.have.property('_getRenderView');
      expect(response._getRenderView).to.be.a('function');

      expect(response).to.have.property('_getRenderData');
      expect(response._getRenderData).to.be.a('function');
    });

    it('shoud initialize with default options', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.cookies).to.deep.equal({});
    });

  });

  describe('Express Response methods', function() {

    describe('.cookie()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should set cookie, when called with, name and value', function() {
        var cookie = {
          value: 'value',
          options: undefined
        };
        response.cookie('name', cookie.value);
        expect(response.cookies.name).to.deep.equal(cookie);
      });

      it('should set cookie, when called with, name, value and options', function() {
        var cookie = {
          value: 'value',
          options: {
            domain: 'foo.bar.com',
            path: '/cookie/path'
          }
        };
        response.cookie('name', cookie.value, cookie.options);
        expect(response.cookies.name).to.deep.equal(cookie);
      });

      it('should throw and error, when called without arguments', function() {
        expect(response.cookie).to.throw;
      });

    });

    describe('.clearCookie()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should remove cookie, when called with existing cookie', function() {
        response.cookie('name', 'value');
        response.clearCookie('name');
        expect(response.cookies.name).not.to.exist;
      });

      it('should return silently, when called with non-existing cookie', function() {
        expect(response.clearCookie.bind(null, 'invalid')).not.to.throw;
      });

    });

    describe('.status()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should set cookie, when called with, name and value', function() {
        response.status(404);
        expect(response.statusCode).to.equal(404);
      });

      it('should statusCode to undefined, when called without arguments', function() {
        response.status();
        expect(response.statusCode).to.not.exist;
      });

    });

    describe('.sendStatus()', function() {
      var response;

      before(function() {
        response = mockResponse.createResponse();
        sinon.spy(response, 'send');
      });

      after(function() {
        response.send.restore();
        response = null;
      });

      it('should set .statusCode, set .type to "text/plain", and call .send()', function() {
        response.sendStatus(404);
        expect(response.statusCode).to.equal(404);
        expect(response.get('Content-Type')).to.equal('text/plain');
        expect(response.send).to.have.been.calledOnce;
      });
    });

    describe('.contentType()/.type()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      it('should set "Content-Type"', function() {
        response.type('html');
        expect(response.get('Content-Type')).to.equal('text/html');
        response.contentType('txt');
        expect(response.get('Content-Type')).to.equal('text/plain');
      });

      it('should trow an error, when called without arguments', function() {
        expect(response.type).to.throw;
        expect(response.contentType).to.throw;
      });

    });

    describe('.vary()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
        sinon.spy(response, 'setHeader');
      });

      afterEach(function() {
        response.setHeader.restore();
        response = null;
      });

      it('should set vary header, when called with a single field', function() {
        response.vary('value1');
        expect(response.setHeader).to.have.been.calledWith('Vary', 'value1');
        expect(response.get('Vary')).to.equal('value1');
      });

      it('should set vary header, when called with a an array of fields', function() {
        response.vary([ 'value1', 'value2' ]);
        expect(response.setHeader).to.have.been.calledWith('Vary', 'value1, value2');
        expect(response.get('Vary')).to.equal('value1, value2');
      });

      it('should not duplicate vary header values (regardless of case)', function() {
        response.vary([ 'value1', 'value2' ]);
        response.vary([ 'Value1', 'VALUE2', 'value3' ]);
        expect(response.get('Vary')).to.equal('value1, value2, value3');
      });

    });

    describe('.location()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      it('sets the Location header to the given path', function() {
        response.location('/a/nice/location');
        expect(response.get('Location')).to.equal('/a/nice/location');
      });

      it('returns the response object', function() {
        expect(response.location('')).to.equal(response);
      });
    });

    describe('.set()/.header()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
        sinon.spy(response, 'setHeader');
      });

      afterEach(function() {
        response.setHeader.restore();
        response = null;
      });

      it('should set header, when called with name and value strings', function() {
        response.set('name1', 'value1');
        expect(response.setHeader).to.have.been.calledWith('name1', 'value1');
        expect(response.get('name1')).to.equal('value1');

        response.header('name2', 'value2');
        expect(response.setHeader).to.have.been.calledWith('name2', 'value2');
        expect(response.get('name2')).to.equal('value2');
      });

      it('should conver value to string, when called with called with non-string value', function() {
        var num = 1;
        var obj = { key: 'value' };
        var bool = false;

        response.set('num', num);
        expect(response.setHeader).to.have.been.calledWith('num', num.toString());
        expect(response.get('num')).to.equal(num.toString());

        response.set('obj', obj);
        expect(response.setHeader).to.have.been.calledWith('obj', obj.toString());
        expect(response.get('obj')).to.equal(obj.toString());

        response.set('bool', bool);
        expect(response.setHeader).to.have.been.calledWith('bool', bool.toString());
        expect(response.get('bool')).to.equal(bool.toString());
      });

      it('should set headers, when called with a hash of key/values', function() {
        var headers = {
          name1: 'value1',
          name2: 'value2'
        };

        response.set(headers);
        expect(response.setHeader).to.have.been.calledTwice;
        expect(response.setHeader).to.have.been.calledWith('name1', 'value1');
        expect(response.setHeader).to.have.been.calledWith('name2', 'value2');

        expect(response.get('name1')).to.equal('value1');
        expect(response.get('name2')).to.equal('value2');
      });

      it('should throw an error when called without arguments', function() {
        expect(response.set).to.throw;
        expect(response.header).to.throw;
      });

    });

    describe('.get()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should get header, when called existing header name', function() {
        response.set('name1', 'value1');
        expect(response.get('name1')).to.equal('value1');

        response.header('name2', 'value2');
        expect(response.get('name2')).to.equal('value2');
      });

      it('should throw and error, when called without arguments', function() {
        expect(response.get).to.throw;
        expect(response.getHeader).to.throw;
      });

    });

    describe('.redirect()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should mimic Express Response.redirect()');

      it('should redirect with status 302, when not specified', function() {
        var url = '/path/to/redirect';

        response.redirect(url);
        expect(response.statusCode).to.equal(302);
        expect(response._getRedirectUrl()).to.equal(url);
      });

      it('should redirect with status specified status', function() {
        var statusCode = 301;
        var url = '/path/to/redirect';

        response.redirect(statusCode, url);
        expect(response.statusCode).to.equal(statusCode);
        expect(response._getRedirectUrl()).to.equal(url);
      });

    });

    // TODO: fix in 2.0; method should mimic Express Response.render()
    describe('.render()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
        sinon.spy(response, 'emit');
      });

      afterEach(function() {
        response.emit.restore();
        response = null;
      });

      it('should mimic Express Response.render()');

      it('should accept view argument only', function() {
        var view = 'view';

        response.render(view);
        expect(response._getRenderView()).to.equal(view);
        expect(response._getRenderData()).to.deep.equal({});
        expect(response.emit).to.have.been.calledTwice;
        expect(response.emit).to.have.been.calledWith('render');
        expect(response.emit).to.have.been.calledWith('end');
      });

      it('should accept view and data arguments', function() {
        var view = 'view';
        var data = { key: 'value' };

        response.render(view, data);
        expect(response._getRenderView()).to.equal(view);
        expect(response._getRenderData()).to.deep.equal(data);
        expect(response.emit).to.have.been.calledTwice;
        expect(response.emit).to.have.been.calledWith('render');
        expect(response.emit).to.have.been.calledWith('end');
      });

    });

    // TODO: fix in 2.0; method should mimic Express Response.send()
    describe('.send()', function() {

      it('should mimic Express Response.send()');

    });

    // TODO: fix in 2.0; method should mimic Express Response.json()
    describe('.json()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
        sinon.spy(response, 'emit');
      });

      afterEach(function() {
        response.emit.restore();
        response = null;
      });

      it('method should mimic Express Response.json()');

      it('should emit send and end events', function() {
        response.json({});
        expect(response.emit).to.have.been.calledTwice;
        expect(response.emit).to.have.been.calledWith('send');
        expect(response.emit).to.have.been.calledWith('end');
      });

      // reference : https://github.com/howardabrams/node-mocks-http/pull/98
      it('should call .write()', function() {
        var originalWrite = response.write.bind(response);
        var hackedContent = JSON.stringify({foo: 'bar'});
        response.write = function(data, encoding) {
          console.log('data :', data);
          return originalWrite(hackedContent, encoding);
        };
        response.json({hello: 'world'});
        expect(response._getData()).to.eql(hackedContent);
      });

    });

    // TODO: fix in 2.0; method should mimic Express Response.jsonp()
    describe('.jsonp()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
        sinon.spy(response, 'emit');
      });

      afterEach(function() {
        response.emit.restore();
        response = null;
      });

      it('method should mimic Express Response.jsonp()');

      it('should emit send and end events', function() {
        response.jsonp({});
        expect(response.emit).to.have.been.calledTwice;
        expect(response.emit).to.have.been.calledWith('send');
        expect(response.emit).to.have.been.calledWith('end');
      });
    });

    // TODO: fix in 2.0; method should mimic Express Response.redirect()
    describe('.redirect()', function() {
      it('method should mimic Express Response.redirect()');
    });

    describe('.format()', function() {
      var response, request;

      beforeEach(function () {
        request = mockRequest.createRequest();
        response = mockResponse.createResponse({ req: request });
      });

      it('sends 406 when given no supported formats', function() {
        response.format({});
        expect(response.statusCode).to.equal(406);
        expect(response._getData()).to.equal('Not Acceptable');
      });

      it('throws when no request object is available', function() {
        response = mockResponse.createResponse();

        expect(function() {
          response.format({ html: function() {} });
        }).to.throw(Error, /Request object unavailable/);
      });

      it('calls the handler for the closest accepted type', function() {
        var htmlSpy = sinon.spy();
        var jsonSpy = sinon.spy();

        request.headers.accept = 'application/json';
        response.format({ html: htmlSpy, json: jsonSpy });

        expect(htmlSpy).to.not.have.been.called;
        expect(jsonSpy).to.have.been.called;
      });

      it('sends 406 when no match is found', function() {
        var htmlSpy = sinon.spy();
        var jsonSpy = sinon.spy();

        request.headers.accept = 'text/xml';
        response.format({ html: htmlSpy, json: jsonSpy });

        expect(htmlSpy).to.not.have.been.called;
        expect(jsonSpy).to.not.have.been.called;
        expect(response.statusCode).to.equal(406);
      });

      it('runs default function if it exists and no match is found', function() {
        var defaultSpy = sinon.spy();
        response.format({ default: defaultSpy });
        expect(defaultSpy).to.have.been.called;
      });
    });
  });

  // TODO: fix in 2.0; methods should be inherited from Node ServerResponse
  describe('Node ServerResponse methods', function() {

    describe('.writeHead()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();

        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(response._getHeaders()).to.be.empty;
      });

      afterEach(function() {
        response = null;
      });

      it('should inherit from ServerResponse.writeHead()');

      it('writes the statusCode of the response', function() {
        response.writeHead(400);
        expect(response.statusCode).to.equal(400);
      });

      it('writes the statusMessage of the response', function() {
        response.writeHead(400, 'NotOK');
        expect(response.statusMessage).to.equal('NotOK');
      });

      it('writes the headers of the response', function() {
        var headers = { 'x-header': 'test llama' };
        response.writeHead(400, headers);
        expect(response._getHeaders()).to.deep.equal(headers);
      });

      it('updates the headersSent property of the response', function() {
        var headers = { 'x-header': 'test llama' };
        response.writeHead(400, headers);
        // headers are only sent by node with first body byte
        expect(response.headersSent).to.equal(false);
        response.write('foo');
        expect(response.headersSent).to.equal(true);
        // further updates to headers shouldn't really be reflected in mock headers
        // since these would be transmitted as part of the body (probably breaking chunked encoding)
        // in real life.
        response.writeHead(500, {'x-header': 'llama party'});
        // Should still see same as before
        expect(response._getHeaders()).to.deep.equal(headers);
      });

      it('works with statusMessage and headers as optional', function() {
        response.writeHead(400);
        expect(response.statusCode).to.equal(400);
        expect(response.statusMessage).to.equal('OK');
        expect(response._getHeaders()).to.be.empty;
      });

      it('works with statusMessage as optional', function() {
        var headers = { 'x-header': 'test llama' };
        response.writeHead(400, headers);
        expect(response.statusMessage).to.equal('OK');
        expect(response._getHeaders()).to.deep.equal(headers);
      });

      it('works with headers as optional', function() {
        response.writeHead(400, 'NotOK');
        expect(response.statusMessage).to.equal('NotOK');
        expect(response._getHeaders()).to.be.empty;
      });

      it('works with statusCode, statusMessage, and headers defined', function() {
        var headers = { 'x-header': 'test llama' };
        response.writeHead(400, 'NotOK', headers);
        expect(response.statusMessage).to.equal('NotOK');
        expect(response._getHeaders()).to.deep.equal(headers);
      });

      it('throws if end has already been called', function() {
        response.end();
        expect(response.writeHead.bind(response, 200)).to.throw('The end() method has already been called');
      });

      it('merges the given headers with the ones specified earlier (set with `setHeader`)', function() {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.writeHead(200, {'Access-Control-Max-Age': '86400'});
        expect(response._getHeaders()).to.contain.all.keys({'Access-Control-Allow-Origin': '*', 'Access-Control-Max-Age': '86400'});
      });

    });

  });

  // TODO: fix in 2.0; methods should be inherited from Node OutogingMessage
  describe('Node OutogingMessage methods', function() {

    describe('.setHeader()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });


      it('should set header, when called with name and value strings', function() {
        response.setHeader('name', 'value');
        expect(response.getHeader('name')).to.equal('value');
      });

      it('should throw an error when called without arguments', function() {
        expect(response.setHeader).to.throw;
      });

    });

    describe('.getHeader()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should get header, when called existing header', function() {
        response.set('name1', 'value1');
        expect(response.getHeader('name1')).to.equal('value1');

        response.header('name2', 'value2');
        expect(response.getHeader('name2')).to.equal('value2');
      });

      it('should get header regardless of case, when called existing header', function() {
        response.set('NAME1', 'value1');
        expect(response.getHeader('name1')).to.equal('value1');

        response.header('name2', 'value2');
        expect(response.getHeader('NAME2')).to.equal('value2');
      });

      it('should throw and error, when called without arguments', function() {
        expect(response.getHeader).to.throw;
      });

    });

    describe('.removeHeader()', function() {
      var response;

      beforeEach(function() {
        response = mockResponse.createResponse();
      });

      afterEach(function() {
        response = null;
      });

      it('should delete header, when with called existing header', function() {
        response.set('namer1');
        response.removeHeader('name1');
        expect(response.getHeader('name1')).not.to.exist;
      });

      it('should exit silently, when with called non-existing header', function() {
        expect(response.getHeader('name2')).not.to.exist;
        response.removeHeader('name2');
      });

      it('should throw and error, when called without arguments', function() {
        expect(response.removeHeader).to.throw;
      });

    });

    describe('.write()', function() {

      it('should inherit from Node OutogingMessage.write()');

    });

    describe('.end()', function() {

      it('should inherit from Node OutogingMessage.end()');

    });

  });

  // TODO: fix in 2.0; methods should be inherited from Node WritableStream
  describe('node WritableStream methods', function() {

    describe('.destroy()', function() {

      it('should inherit from Node WritableStream.destroy()');

    });

    describe('.destroySoon()', function() {

      it('should inherit from Node WritableStream.destroySoon()');

    });

  });

  // TODO: fix in 2.0; methods should be inherited from Node EventEmitter
  describe('node EventEmitter methods', function() {

    describe('.addListener()', function() {

      it('should inherit from Node EventEmitter.addListener()');

    });

    describe('.on()', function() {

      it('should inherit from Node EventEmitter.on()');

    });

    describe('.once()', function() {

      it('should inherit from Node EventEmitter.once()');

    });

    describe('.removeListener()', function() {

      it('should inherit from Node EventEmitter.removeListener()');

    });

    describe('.removeAllListeners()', function() {

      it('should inherit from Node EventEmitter.removeAllListeners()');

    });

    describe('.setMaxListeners()', function() {

      it('should inherit from Node EventEmitter.setMaxListeners()');

    });

    describe('.listeners()', function() {

      it('should inherit from Node EventEmitter.listeners()');

    });

    describe('.emit()', function() {

      it('should inherit from Node EventEmitter.emit()');

    });

    describe('.prependListener()', function() {

      it('should inherit from Node EventEmitter.prependListener()');

    });

  });

  // TODO: deprecate helper methods in 2.0
  describe('helper methods', function() {
    var response;

    beforeEach(function() {
      response = mockResponse.createResponse();
    });

    afterEach(function() {
      response = null;
    });

    describe('._isEndCalled()', function() {

      it('will be deprecated in 2.0');

      it('should return false when .end() hasn\'t been called', function() {
        expect(response._isEndCalled()).to.be.false;
      });

      it('should return true when .end() has been called', function() {
        response.end();
        expect(response._isEndCalled()).to.be.true;
      });

    });

    describe('._getHeaders()', function() {

      it('will be deprecated in 2.0');

      it('should return empty object when no headers have been set', function() {
        expect(response._getHeaders()).to.deep.equal({});
      });

      it('should return true when .end() has been called', function() {
        var headers = {
          'Content-Type': 'text/plain'
        };
        response.type('txt');
        expect(response._getHeaders()).to.deep.equal(headers);
      });

    });

    describe('._getData()', function() {

      it('will be deprecated in 2.0');

      it('should return empty string when no data has been sent', function() {
        expect(response._getData()).to.equal('');
      });

      it('should return sent data', function() {
        response.send('data');
        expect(response._getData()).to.equal('data');
      });

    });

    describe('._getStatusCode()', function() {

      it('will be deprecated in 2.0');

      it('should return default status code, when not set', function() {
        expect(response._getStatusCode()).to.equal(200);
      });

      it('should return set status code', function() {
        response.status(404);
        expect(response._getStatusCode()).to.equal(404);
      });

    });

    describe('._getStatusMessage()', function() {

      it('will be deprecated in 2.0');

      it('should return the default status message, when not set', function() {
        expect(response._getStatusMessage()).to.equal('OK');
      });

      it('should return set status message', function() {
        response.statusMessage = 'NotOK';
        expect(response._getStatusMessage()).to.equal('NotOK');
      });

      it('should return status message set by .writeHead()', function() {
        response.writeHead(400, 'NotOK');
        expect(response._getStatusMessage()).to.equal('NotOK');
      });

    });

    describe('._isJSON()', function() {

      it('will be deprecated in 2.0');

      it('should return true, when Content-Type is JSON', function() {
        response.type('json');
        expect(response._isJSON()).to.be.true;
      });

      it('should return false, when Content-Type is not JSON', function() {
        response.type('html');
        expect(response._isJSON()).to.be.false;
      });

    });

    describe('._isUTF8()', function() {

      it('will be deprecated in 2.0');

      it('should return false, when enconding is not UTF-8', function() {
        expect(response._isUTF8()).to.be.false;
      });

      it('should return true, when enconding is UTF-8', function() {
        response.setEncoding('utf8');
        expect(response._isUTF8()).to.be.true;
      });

    });

    describe('._isDataLengthValid()', function() {

      it('will be deprecated in 2.0');

      it('should return true, when Content-Length not present', function() {
        expect(response._isDataLengthValid()).to.be.true;
      });

      it('should return true, when Content-Length equals data size', function() {
        response.send('data');
        response.header('Content-Length', '4');
        expect(response._isDataLengthValid()).to.be.true;
      });

      it('should return false, when Content-Length does not equal data size', function() {
        response.send('data');
        response.header('Content-Length', '5');
        expect(response._isDataLengthValid()).to.be.false;
      });

    });

    describe('._getRedirectUrl()', function() {

      it('will be deprecated in 2.0');

      it('should return empty string, when .redirect() not called', function() {
        expect(response._getRedirectUrl()).to.equal('');
      });

      it('should return redirect url', function() {
        var url = '/path/to/redirect';
        response.redirect(url);
        expect(response._getRedirectUrl()).to.equal(url);
      });

    });

    describe('._getRenderView()', function() {

      it('will be deprecated in 2.0');

      it('should return empty string, when .render() not called', function() {
        expect(response._getRenderView()).to.equal('');
      });

      it('should return name of rendered view', function() {
        var view = 'view';
        response.render(view);
        expect(response._getRenderView()).to.equal(view);
      });

    });

    describe('._getRenderData()', function() {

      it('will be deprecated in 2.0');

      it('should return empty object, when .render() not called', function() {
        expect(response._getRenderData()).to.deep.equal({});
      });

      it('should return empty object, when .render() called without data', function() {
        response.render('view');
        expect(response._getRenderData()).to.deep.equal({});
      });

      it('should return data object, when .render() called with data', function() {
        var data = {
          key: 'value'
        };
        response.render('view', data);
        expect(response._getRenderData()).to.deep.equal(data);
      });

    });

  });


});
