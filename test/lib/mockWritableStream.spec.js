const chai = require('chai');

const { expect } = chai;

const MockWritableStream = require('../../lib/mockWritableStream');

let mockWritableStream;

describe('mockWritableStream', () => {
    before(() => {
        mockWritableStream = new MockWritableStream();
    });

    it('should be a function', () => {
        expect(MockWritableStream).to.be.a('function');
    });

    it('should be an object factory', () => {
        expect(mockWritableStream).to.be.a('object');
        expect(mockWritableStream).to.be.an.instanceof(MockWritableStream);
    });

    it('should expose "MockWritableStream" prototype', () => {
        expect(mockWritableStream).to.have.property('end');
        expect(mockWritableStream.end).to.be.a('function');

        expect(mockWritableStream).to.have.property('destroy');
        expect(mockWritableStream.destroy).to.be.a('function');

        expect(mockWritableStream).to.have.property('destroySoon');
        expect(mockWritableStream.destroySoon).to.be.a('function');
    });

    it('should return undefined when methods called', () => {
        expect(mockWritableStream.end()).to.be.an('undefined');
        expect(mockWritableStream.destroy()).to.be.an('undefined');
        expect(mockWritableStream.destroySoon()).to.be.an('undefined');
    });
});
