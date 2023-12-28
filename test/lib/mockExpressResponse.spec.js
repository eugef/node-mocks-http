'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var mockExpressResponse = require('../../lib/express/mock-express').response;

describe('mockExpressResponse', function () {
    it('should expose .createResponse()', function () {
        expect(mockExpressResponse.createResponse).to.be.a('function');
    });

    describe('.createResponse()', function () {
        var response;

        before(function () {
            response = mockExpressResponse.createResponse();
        });

        it('should return an object', function () {
            expect(response).to.be.an('object');
        });
    });
});
