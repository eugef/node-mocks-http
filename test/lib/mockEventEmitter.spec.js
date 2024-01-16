const chai = require('chai');

const { expect } = chai;

const MockEventEmitter = require('../../lib/mockEventEmitter');

let mockEventEmitter;

describe('mockEventEmitter', () => {
    before(() => {
        mockEventEmitter = new MockEventEmitter();
    });

    it('should be a function', () => {
        expect(MockEventEmitter).to.be.a('function');
    });

    it('should be an object factory', () => {
        expect(mockEventEmitter).to.be.a('object');
        expect(mockEventEmitter).to.be.an.instanceof(MockEventEmitter);
    });

    it('should expose "MockEventEmitter" prototype', () => {
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

        expect(mockEventEmitter).to.have.property('prependListener');
        expect(mockEventEmitter.prependListener).to.be.a('function');
    });

    it('should return undefined when methods called', () => {
        expect(mockEventEmitter.addListener()).to.be.an('undefined');
        expect(mockEventEmitter.on()).to.be.an('undefined');
        expect(mockEventEmitter.once()).to.be.an('undefined');
        expect(mockEventEmitter.removeListener()).to.be.an('undefined');
        expect(mockEventEmitter.removeAllListeners()).to.be.an('undefined');
        expect(mockEventEmitter.setMaxListeners()).to.be.an('undefined');
        expect(mockEventEmitter.listeners()).to.be.an('undefined');
        expect(mockEventEmitter.emit()).to.be.an('undefined');
        expect(mockEventEmitter.prependListener()).to.be.an('undefined');
    });
});
