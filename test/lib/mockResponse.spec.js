'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var mockResponse = require('../../lib/mockResponse');

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

    });

    // TODO: fix in 2.0; method should mimic Express Response.redirect()
    describe('.redirect()', function() {

      it('method should mimic Express Response.redirect()');

    });

  });

  // TODO: fix in 2.0; methods should be inherited from Node ServerResponse
  describe('Node ServerResponse methods', function() {

    describe('.writeHead()', function() {

      it('should inherit from ServerResponse.writeHead()');

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
