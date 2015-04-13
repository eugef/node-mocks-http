'use strict';

var chai = require('chai');
var expect = chai.expect;
var url = require('url');
var querystring = require('querystring');

var mockRequest = require('../../lib/mockRequest');

describe('mockRequest', function() {

  it('should expose .createRequest()', function() {
    expect(mockRequest.createRequest).to.be.a('function');
  });

  describe('.createRequest()', function() {
    var request;

    describe('without options', function() {

      before(function() {
        request = mockRequest.createRequest();
      });

      it('should return an object', function() {
        expect(request).to.be.an('object');
      });

      it('should expose Express Request object methods', function() {
        expect(request).to.have.property('get');
        expect(request.get).to.be.a('function');

        expect(request).to.have.property('header');
        expect(request.header).to.be.a('function');

        expect(request).to.have.property('param');
        expect(request.param).to.be.a('function');
      });

      it('shoud initialize with default options', function() {
        expect(request.method).to.equal('GET');
        expect(request.url).to.equal('');
        expect(request.originalUrl).to.equal(request.url);
        expect(request.path).to.equal('');
        expect(request.params).to.deep.equal({});
        expect(request.session).to.not.exist;
        expect(request.cookies).to.deep.equal({});
        expect(request.signedCookies).to.not.exist;
        expect(request.headers).to.deep.equal({});
        expect(request.body).to.deep.equal({});
        expect(request.query).to.deep.equal({});
        expect(request.files).to.deep.equal({});
      });

    });

    describe('with options', function() {

      afterEach(function() {
        request = null;
      });

      it('should set .method to options.method', function() {
        var options = {
          method: 'POST'
        };

        request = mockRequest.createRequest(options);
        expect(request.method).to.equal(options.method);
      });

      it('should set .url to options.url', function() {
        var options = {
          url: '/this/is/a/url'
        };

        request = mockRequest.createRequest(options);
        expect(request.url).to.equal(options.url);
        expect(request.originalUrl).to.equal(options.url);
      });

      it('should set .originalUrl to options.originalUrl', function() {
        var options = {
          originalUrl: '/this/is/a/url'
        };

        request = mockRequest.createRequest(options);
        expect(request.originalUrl).to.equal(options.originalUrl);
      });

      it('should set .path to pathname of options.url', function() {
        var options = {
          url: '/this/is/a/url'
        };

        request = mockRequest.createRequest(options);
        expect(request.path).to.equal(url.parse(options.url).pathname);
      });

      it('should set .params to options.params', function() {
        var options = {
          params: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.params).to.deep.equal(options.params);
      });

      it('should set .session to options.session', function() {
        var options = {
          session: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.session).to.deep.equal(options.session);
      });

      it('should set .cookies to options.cookies', function() {
        var options = {
          cookies: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.cookies).to.deep.equal(options.cookies);
      });

      it('should set .signedCookies to options.signedCookies', function() {
        var options = {
          signedCookies: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.signedCookies).to.deep.equal(options.signedCookies);
      });

      it('should set .headers to options.headers', function() {
        var options = {
          headers: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.headers).to.deep.equal(options.headers);
      });

      it('should set .headers to options.headers and be accessible via get() and header() case-insensitively', function() {
        var options = {
          headers: {
            KEY1: 'value1',
            Key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.header('KEY1')).to.equal('value1');
        expect(request.get('KEY1')).to.equal('value1');
        expect(request.header('KEY2')).to.equal('value2');
        expect(request.get('KEY2')).to.equal('value2');
      });

      it('should set .body to options.body', function() {
        var options = {
          body: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.body).to.deep.equal(options.body);
      });

      it('should set .query to options.query', function() {
        var options = {
          query: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.query).to.deep.equal(options.query);
      });

      it('should set .files to options.files', function() {
        var options = {
          files: {
            key1: 'value1',
            key2: 'value2'
          }
        };

        request = mockRequest.createRequest(options);
        expect(request.files).to.deep.equal(options.files);
      });

      it('should set .query to url query params when options.query not set', function() {
        var options = {
          url: '/path/to/url?key1=value1&key2=value2'
        };
        var parsedOptions = querystring.parse(options.url.split('?')[1]);

        request = mockRequest.createRequest(options);
        expect(request.query).to.deep.equal(parsedOptions);
      });

    });

  });

  describe('.get()/.header()', function() {
    var request;

    afterEach(function() {
      request = null;
    });

    it('should return header, when set', function() {
      var options = {
        headers: {
          key: 'value'
        }
      };
      request = mockRequest.createRequest(options);
      expect(request.get('key')).to.equal('value');
      expect(request.header('key')).to.equal('value');
    });

    it('should return referer, when request as referrer', function() {
      var options = {
        headers: {
          referer: 'value'
        }
      };

      request = mockRequest.createRequest(options);
      expect(request.get('referrer')).to.equal('value');
      expect(request.header('referrer')).to.equal('value');
    });

    it('should return referrer, when request as referer', function() {
      var options = {
        headers: {
          referrer: 'value'
        }
      };

      request = mockRequest.createRequest(options);
      expect(request.get('referer')).to.equal('value');
      expect(request.header('referer')).to.equal('value');
    });

    it('should not return header, when not set', function() {
      request = mockRequest.createRequest();
      expect(request.get('key')).to.not.exist;
      expect(request.header('key')).to.not.exist;
    });

  });

  describe('.param()', function() {
    var request;

    afterEach(function() {
      request = null;
    });

    it('should return param, when found in params', function() {
      var options = {
        params: {
          key: 'value'
        }
      };

      request = mockRequest.createRequest(options);
      expect(request.param('key')).to.equal('value');
    });

    it('should return param, when found in body', function() {
      var options = {
        body: {
          key: 'value'
        }
      };

      request = mockRequest.createRequest(options);
      expect(request.param('key')).to.equal('value');
    });

    it('should return param, when found in query', function() {
      var options = {
        query: {
          key: 'value'
        }
      };

      request = mockRequest.createRequest(options);
      expect(request.param('key')).to.equal('value');
    });

    it('should not return param, when not found in params/body/query', function() {
      request = mockRequest.createRequest();
      expect(request.get('key')).to.not.exist;
      expect(request.header('key')).to.not.exist;
    });

  });

  describe('helper functions', function() {
    var request;

    beforeEach(function() {
      request = mockRequest.createRequest();
    });

    afterEach(function() {
      request = null;
    });

    describe('._setParameter()', function() {

      it('should set param, when called with key and value', function() {
        request._setParameter('key', 'value');
        expect(request.param('key')).to.equal('value');
      });

      it('should unset param, when called with key and no value', function() {
        request._setParameter('key', 'value');
        request._setParameter('key');
        expect(request.param('key')).to.not.exist;
      });

      it('should throw an error, when called with no arguments', function () {
        expect(request._setParameter).to.throw;
      });

    });

    describe('._setSessionVariable()', function() {

      it('should set session variable, when called with key and value', function() {
        request._setSessionVariable('key', 'value');
        expect(request.session.key).to.equal('value');
      });

      it('should unset session variable, when called with key and no value', function() {
        request._setSessionVariable('key', 'value');
        request._setSessionVariable('key');
        expect(request.param('key')).to.not.exist;
      });

      it('should throw an error, when called with no arguments', function () {
        expect(request._setSessionVariable).to.throw;
      });

    });

    describe('._setCookiesVariable()', function() {

      it('should set cookie, when called with key and value', function() {
        request._setCookiesVariable('key', 'value');
        expect(request.cookies.key).to.equal('value');
      });

      it('should unset cookie, when called with key and no value', function() {
        request._setCookiesVariable('key', 'value');
        request._setCookiesVariable('key');
        expect(request.cookies.key).to.not.exist;
      });

      it('should throw an error, when called with no arguments', function () {
        expect(request._setCookiesVariable).to.throw;
      });

    });

    describe('._setSignedCookiesVariable()', function() {

      it('should set signed cookie, when called with key and value', function() {
        request._setSignedCookiesVariable('key', 'value');
        expect(request.signedCookies.key).to.equal('value');
      });

      it('should unset signed cookie, when called with key and no value', function() {
        request._setSignedCookiesVariable('key', 'value');
        request._setSignedCookiesVariable('key');
        expect(request.signedCookies.key).to.not.exist;
      });

      it('should throw an error, when called with no arguments', function () {
        expect(request._setSignedCookiesVariable).to.throw;
      });

    });

    describe('._setHeadersVariable()', function() {

      it('should set header, when called with key and value', function() {
        request._setHeadersVariable('key', 'value');
        expect(request.get('key')).to.equal('value');
        expect(request.header('key')).to.equal('value');
      });

      it('should throw an error, when called with missing arguments', function () {
        expect(request._setHeadersVariable).to.throw;
        expect(request._setHeadersVariable.bind(null, 'key')).to.throw;
      });

    });

    describe('._setFilesVariable()', function() {

      it('should set file, when called with key and value', function() {
        request._setFilesVariable('key', 'value');
        expect(request.files.key).to.equal('value');
      });

      it('should unset file, when called with key and no value', function() {
        request._setFilesVariable('key', 'value');
        request._setFilesVariable('key');
        expect(request.files.key).to.not.exist;
      });

      it('should throw an error, when called with no arguments', function () {
        expect(request._setFilesVariable).to.throw;
      });

    });

    describe('._setMethod()', function() {

      it('should set method, when called with value', function() {
        var value = 'HEAD';
        request._setMethod(value);
        expect(request.method).to.equal(value);
      });

      it('should unset method, when called with no arguments', function() {
        request._setMethod();
        expect(request.method).to.not.exist;
      });

    });

    describe('._setURL()', function() {

      it('should set url, when called with value', function() {
        var value = '/path/to/url';
        request._setURL(value);
        expect(request.url).to.equal(value);
      });

      it('should unset url, when called with no arguments', function() {
        request._setURL();
        expect(request.url).to.not.exist;
      });

    });

    describe('._setOriginalUrl()', function() {

      it('should set originalUrl, when called with value', function() {
        var value = '/path/to/url';
        request._setOriginalUrl(value);
        expect(request.originalUrl).to.equal(value);
      });

      it('should unset originalUrl, when called with no arguments', function() {
        request._setOriginalUrl();
        expect(request.originalUrl).to.not.exist;
      });

    });

    describe('._setBody()', function() {

      it('should set body, when called with value', function() {
        var value = {
          key1: 'value1',
          key2: 'value2'
        };
        request._setBody(value);
        expect(request.body).to.deep.equal(value);
      });

      it('should unset body, when called with no arguments', function() {
        request._setBody();
        expect(request.body).to.not.exist;
      });

    });

    describe('._addBody()', function() {

      it('should add body variable, when called with key and value', function() {
        request._addBody('key', 'value');
        expect(request.body.key).to.equal('value');
      });

      it('should unset body variable, when called with key and no value', function() {
        request._addBody('key', 'value');
        request._addBody('key');
        expect(request.body.key).to.not.exist;
      });

      it('should throw an error, when called with no arguments', function () {
        expect(request._addBody).to.throw;
      });

    });

  });

});
