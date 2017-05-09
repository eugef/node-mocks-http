'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var mockExpressResponse = require('../../lib/express/mock-express').response;
var mockRequest = require('../../lib/mockRequest');

describe('mockExpressResponse', function() {

  it('should expose .createResponse()', function() {
    expect(mockExpressResponse.createResponse).to.be.a('function');
  });

  describe('.createResponse()', function() {
    var response;

    before(function() {
      response = mockExpressResponse.createResponse();
    });

    it('should return an object', function() {
      expect(response).to.be.an('object');
    });

    it('should have a .locals property object', function() {
      expect(response.locals).to.be.an('object');
    });

    it('should allow you to pass options.locals', function() {
      var res = mockExpressResponse.createResponse({ locals: { test: true } });
      expect(res.locals.test).to.equal(true);
    });

  });
});
