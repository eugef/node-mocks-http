const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const mockExpressResponse = require('../../lib/express/mock-express').response;

describe('mockExpressResponse', () => {
    it('should expose .createResponse()', () => {
        expect(mockExpressResponse.createResponse).to.be.a('function');
    });

    describe('.createResponse()', () => {
        let response;

        before(() => {
            response = mockExpressResponse.createResponse();
        });

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });
    });
});
