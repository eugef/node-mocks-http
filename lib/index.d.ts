import { Request, Response } from 'express';

declare module 'node-mocks-http' {

    export type RequestMethod =
        'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';

    export interface Params {
        [key: string]: any;
    }

    export interface Session {
        [key: string]: string;
    }

    export interface Cookies {
        [key: string]: string;
    }

    export interface Headers {
        [key: string]: string;
    }

    export interface Query {
        [key: string]: any;
    }

    export interface Files {
        [key: string]: string;
    }

    export interface Body {
        [key: string]: any;
    }

    export interface RequestOptions {
        method?: RequestMethod;
        url?: string;
        originalUrl?: string;
        baseUrl?: string;
        path?: string;
        params?: Params;
        session?: Session;
        cookies?: Cookies;
        signedCookies?: Cookies;
        headers?: Headers;
        body?: Body;
        query?: Query;
        files?: Files;
    }

    export interface MockRequest extends Request {
        _setParameter: (key: string, value: string) => void;
        _setSessionVariable: (variable: string, value: string) => void;
        _setCookiesVariable: (variable: string, value: string) => void;
        _setSignedCookiesVariable: (variable: string, value: string) => void;
        _setHeadersCookiesVariable: (variable: string, value: string) => void;
        _setFilesCookiesVariable: (variable: string, value: string) => void;
        _setMethod: (method: string) => void;
        _setURL: (value: string) => void;
        _setOriginalUrl: (value: string) => void;
        _setBody: (body: Body) => void;
        _addBody: (key: string, value: any) => void;
    }

    export interface ResponseOptions {
        eventEmitter?: any;
        writableStream?: any;
        req?: any;
    }

    export interface MockResponse extends Response {
        _isEndCalled: () => boolean;
        _getHeaders: () => Headers;
        _getData: () => any;
        _getStatusCode: () => number;
        _getStatusMessage: () => string;
        _isJSON: () => boolean;
        _isUTF8: () => boolean;
        _isDataLengthValid: () => boolean;
        _getRedirectUrl: () => string;
        _getRenderData: () => any;
    }

    export function createRequest(options?: RequestOptions): MockRequest;

    export function createResponse(options?: ResponseOptions): MockResponse;

    export interface Mocks {
        req: MockRequest;
        res: MockResponse;
    }

    export function createMocks(reqOptions?: RequestOptions, resOptions?: ResponseOptions): Mocks;
}
