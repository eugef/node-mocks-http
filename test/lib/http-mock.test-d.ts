import { IncomingMessage as NodeRequest, OutgoingMessage as NodeResponse } from 'http';
// eslint-disable-next-line import/no-unresolved
import { expectAssignable, expectNotAssignable, expectNotType, expectType } from 'tsd';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { createMocks, createRequest, createResponse, MockRequest, MockResponse, Mocks } from '../../lib/http-mock';

expectType<MockRequest<NodeRequest>>(createRequest());
expectNotType<MockRequest<ExpressRequest>>(createRequest());
expectAssignable<NodeRequest>(createRequest());
expectAssignable<ExpressRequest>(createRequest());

expectType<MockRequest<NodeRequest>>(createRequest<NodeRequest>());
expectNotType<MockRequest<ExpressRequest>>(createRequest<NodeRequest>());
expectAssignable<NodeRequest>(createRequest<NodeRequest>());
expectNotAssignable<ExpressRequest>(createRequest<NodeRequest>());

expectType<MockRequest<ExpressRequest>>(createRequest<ExpressRequest>());
expectNotType<MockRequest<NodeRequest>>(createRequest<ExpressRequest>());
expectAssignable<ExpressRequest>(createRequest<ExpressRequest>());
expectAssignable<NodeRequest>(createRequest<ExpressRequest>());

expectType<MockResponse<NodeResponse>>(createResponse());
expectNotType<MockResponse<ExpressResponse>>(createResponse());
expectAssignable<NodeResponse>(createResponse());
expectAssignable<ExpressResponse>(createResponse());

expectType<MockResponse<NodeResponse>>(createResponse<NodeResponse>());
expectNotType<MockResponse<ExpressResponse>>(createResponse<NodeResponse>());
expectAssignable<NodeResponse>(createResponse<NodeResponse>());
expectNotAssignable<ExpressResponse>(createResponse<NodeResponse>());

expectType<MockResponse<ExpressResponse>>(createResponse<ExpressResponse>());
expectNotType<MockResponse<NodeResponse>>(createResponse<ExpressResponse>());
expectAssignable<ExpressResponse>(createResponse<ExpressResponse>());
expectAssignable<NodeResponse>(createResponse<ExpressResponse>());

expectType<Mocks<NodeRequest, NodeResponse>>(createMocks());
// eslint-disable-next-line no-undef
expectType<Mocks<globalThis.Request, globalThis.Response>>(createMocks<globalThis.Request, globalThis.Response>());
