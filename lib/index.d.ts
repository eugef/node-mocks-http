import { Request, Response, CookieOptions } from 'express';

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

        // Support custom properties appended on Request objects.
        [key: string]: any;
    }

    export type MockRequest<T extends Request> = T & {
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

        // Support custom properties appended on Request objects.
        [key: string]: any;
    }

    export interface ResponseOptions {
        eventEmitter?: any;
        writableStream?: any;
        req?: any;
        locals?: any;
    }

    export type ResponseCookie = {
        value: any;
        options: CookieOptions;
    }

    export type MockResponse<T extends Response> = T & {
        _isEndCalled: () => boolean;
        _getHeaders: () => Headers;
        _getData: () => any;
        _getJSONData: () => any;
        _getBuffer: () => Buffer;
        _getLocals: () => any;
        _getStatusCode: () => number;
        _getStatusMessage: () => string;
        _isJSON: () => boolean;
        _isUTF8: () => boolean;
        _isDataLengthValid: () => boolean;
        _getRedirectUrl: () => string;
        _getRenderData: () => any;
        _getRenderView: () => string;

        cookies: {[name: string]: ResponseCookie};
    }

    export function createRequest<T extends Request = Request>(options?: RequestOptions): MockRequest<T>;

    export function createResponse<T extends Response = Response>(options?: ResponseOptions): MockResponse<T>;

    export interface Mocks<T1 extends Request, T2 extends Response> {
        req: MockRequest<T1>;
        res: MockResponse<T2>;
    }

    export function createMocks<T1 extends Request = Request, T2 extends Response = Response>(reqOptions?: RequestOptions, resOptions?: ResponseOptions): Mocks<T1, T2>;
}
