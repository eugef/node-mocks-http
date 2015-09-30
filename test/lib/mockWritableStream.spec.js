'use strict';

var chai = require('chai');
var expect = chai.expect;

var MockWritableStream = require('../../lib/mockWritableStream');
var mockWritableStream;

describe('mockWritableStream', function() {

  before(function() {
    mockWritableStream = new MockWritableStream();
  });

  it('should be a function', function() {
    expect(MockWritableStream).to.be.a('function');
  });

  it('should be an object factory', function() {
    expect(mockWritableStream).to.be.a('object');
    expect(mockWritableStream).to.be.an.instanceof(MockWritableStream);
  });

  it('should expose "MockWritableStream" prototype', function() {
    expect(mockWritableStream).to.have.property('end');
    expect(mockWritableStream.end).to.be.a('function');

    expect(mockWritableStream).to.have.property('destroy');
    expect(mockWritableStream.destroy).to.be.a('function');

    expect(mockWritableStream).to.have.property('destroySoon');
    expect(mockWritableStream.destroySoon).to.be.a('function');
  });

  it('should return undefined when methods called', function() {
    expect(mockWritableStream.end()).to.be.undefined;
    expect(mockWritableStream.destroy()).to.be.undefined;
    expect(mockWritableStream.destroySoon()).to.be.undefined;
  });

});
