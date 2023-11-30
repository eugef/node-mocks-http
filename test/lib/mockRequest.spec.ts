import { expect } from "chai";
import { createRequest } from "../../lib/mockRequest";

describe('mockRequest (TS)', () => {
  it('should expose .createRequest()', () => {
    expect(createRequest).to.be.a('function');
  });
});