'use strict';

var chai = require('chai');
var expect = chai.expect;

var httpMock;

describe('http-mock', function() {
  before(function() {
    httpMock = require('../../lib/http-mock');
  });

  it('should export .createRequest()', function() {
    expect(httpMock.createRequest).to.be.a('function');
  });

  it('should export .createResponse()', function() {
    expect(httpMock.createResponse).to.be.a('function');
  });

});
