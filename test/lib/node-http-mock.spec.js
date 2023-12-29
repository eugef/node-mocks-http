const chai = require('chai');
const httpMock = require('../../lib/http-mock');

const { expect } = chai;

describe('http-mock', () => {
    it('should export .createRequest()', () => {
        expect(httpMock.createRequest).to.be.a('function');
    });

    it('should export .createResponse()', () => {
        expect(httpMock.createResponse).to.be.a('function');
    });
});
