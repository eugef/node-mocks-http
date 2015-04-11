'use strict';

var chai = require('chai');
var expect = chai.expect;

var MockEventEmitter = require('../../lib/mockEventEmitter');
var mockEventEmitter;

describe('mockEventEmitter', function() {

  before(function() {
    mockEventEmitter = new MockEventEmitter();
  });

  it('should be a function', function() {
    expect(MockEventEmitter).to.be.a('function');
  });

  it('should be an object factory', function() {
    expect(mockEventEmitter).to.be.a('object');
    expect(mockEventEmitter).to.be.an.instanceof(MockEventEmitter);
  });

  it('should expose "MockEventEmitter" prototype', function() {
    expect(mockEventEmitter).to.have.property('addListener');
    expect(mockEventEmitter.addListener).to.be.a('function');

    expect(mockEventEmitter).to.have.property('on');
    expect(mockEventEmitter.on).to.be.a('function');

    expect(mockEventEmitter).to.have.property('once');
    expect(mockEventEmitter.once).to.be.a('function');

    expect(mockEventEmitter).to.have.property('removeListener');
    expect(mockEventEmitter.removeListener).to.be.a('function');

    expect(mockEventEmitter).to.have.property('removeAllListeners');
    expect(mockEventEmitter.removeAllListeners).to.be.a('function');

    expect(mockEventEmitter).to.have.property('setMaxListeners');
    expect(mockEventEmitter.setMaxListeners).to.be.a('function');

    expect(mockEventEmitter).to.have.property('listeners');
    expect(mockEventEmitter.listeners).to.be.a('function');

    expect(mockEventEmitter).to.have.property('emit');
    expect(mockEventEmitter.emit).to.be.a('function');
  });

  it('should return undefined when methods called', function() {
    expect(mockEventEmitter.addListener()).to.be.undefined;
    expect(mockEventEmitter.on()).to.be.undefined;
    expect(mockEventEmitter.once()).to.be.undefined;
    expect(mockEventEmitter.removeListener()).to.be.undefined;
    expect(mockEventEmitter.removeAllListeners()).to.be.undefined;
    expect(mockEventEmitter.setMaxListeners()).to.be.undefined;
    expect(mockEventEmitter.listeners()).to.be.undefined;
    expect(mockEventEmitter.emit()).to.be.undefined;
  });

});
