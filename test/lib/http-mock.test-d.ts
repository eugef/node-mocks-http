import { IncomingMessage as NodeRequest, OutgoingMessage as NodeResponse } from 'http';
// eslint-disable-next-line import/no-unresolved
import { expectAssignable, expectNotAssignable, expectNotType, expectType } from 'tsd';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { createMocks, createRequest, createResponse, MockRequest, MockResponse, Mocks } from '../../lib/http-mock';

expectType<MockRequest<ExpressRequest>>(createRequest());
expectNotType<MockRequest<NodeRequest>>(createRequest());
expectAssignable<NodeRequest>(createRequest());
expectAssignable<ExpressRequest>(createRequest());

expectType<MockRequest<NodeRequest>>(createRequest<NodeRequest>());
expectNotType<MockRequest<ExpressRequest>>(createRequest<NodeRequest>());
expectAssignable<NodeRequest>(createRequest<NodeRequest>());
expectNotAssignable<ExpressRequest>(createRequest<NodeRequest>());

expectType<MockResponse<ExpressResponse>>(createResponse());
expectNotType<MockResponse<NodeResponse>>(createResponse());
expectAssignable<NodeResponse>(createResponse());
expectAssignable<ExpressResponse>(createResponse());

expectType<MockResponse<NodeResponse>>(createResponse<NodeResponse>());
expectNotType<MockResponse<ExpressResponse>>(createResponse<NodeResponse>());
expectAssignable<NodeResponse>(createResponse<NodeResponse>());
expectNotAssignable<ExpressResponse>(createResponse<NodeResponse>());

expectType<Mocks<ExpressRequest, ExpressResponse>>(createMocks());
// eslint-disable-next-line no-undef
expectType<Mocks<globalThis.Request, globalThis.Response>>(createMocks<globalThis.Request, globalThis.Response>());
