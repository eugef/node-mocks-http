const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const mockResponse = require('../../lib/mockResponse');
const mockRequest = require('../../lib/mockRequest');

describe('mockResponse', () => {
    it('should expose .createResponse()', () => {
        expect(mockResponse.createResponse).to.be.a('function');
    });

    describe('.createResponse()', () => {
        let response;

        before(() => {
            response = mockResponse.createResponse({
                locals: { a: 'b' }
            });
        });

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });

        it('should expose Express Response methods', () => {
            expect(response).to.have.property('cookie');
            expect(response.cookie).to.be.a('function');

            expect(response).to.have.property('clearCookie');
            expect(response.clearCookie).to.be.a('function');

            expect(response).to.have.property('status');
            expect(response.status).to.be.a('function');

            expect(response).to.have.property('send');
            expect(response.send).to.be.a('function');

            expect(response).to.have.property('sendStatus');
            expect(response.sendStatus).to.be.a('function');

            expect(response).to.have.property('json');
            expect(response.json).to.be.a('function');

            expect(response).to.have.property('jsonp');
            expect(response.jsonp).to.be.a('function');

            expect(response).to.have.property('contentType');
            expect(response.contentType).to.be.a('function');

            expect(response).to.have.property('type');
            expect(response.type).to.be.a('function');

            expect(response).to.have.property('set');
            expect(response.set).to.be.a('function');

            expect(response).to.have.property('header');
            expect(response.header).to.be.a('function');

            expect(response).to.have.property('get');
            expect(response.get).to.be.a('function');

            // TODO: check origin of setEnconding() method
            expect(response).to.have.property('setEncoding');
            expect(response.setEncoding).to.be.a('function');

            expect(response).to.have.property('redirect');
            expect(response.redirect).to.be.a('function');

            expect(response).to.have.property('render');
            expect(response.render).to.be.a('function');

            expect(response).to.have.property('attachment');
            expect(response.render).to.be.a('function');
        });

        it('should expose Node OutgoingMessage methods', () => {
            expect(response).to.have.property('getHeader');
            expect(response.getHeader).to.be.a('function');

            expect(response).to.have.property('setHeader');
            expect(response.setHeader).to.be.a('function');

            expect(response).to.have.property('removeHeader');
            expect(response.removeHeader).to.be.a('function');

            expect(response).to.have.property('write');
            expect(response.write).to.be.a('function');

            expect(response).to.have.property('end');
            expect(response.end).to.be.a('function');
        });

        it('should expose Node ServerResponse methods', () => {
            expect(response).to.have.property('writeHead');
            expect(response.writeHead).to.be.a('function');
        });

        it('should expose Node WritableStream methods', () => {
            expect(response).to.have.property('destroy');
            expect(response.destroy).to.be.a('function');

            expect(response).to.have.property('destroySoon');
            expect(response.destroySoon).to.be.a('function');
        });

        it('should expose Node EventEmitter methods', () => {
            expect(response).to.have.property('addListener');
            expect(response.addListener).to.be.a('function');

            expect(response).to.have.property('on');
            expect(response.on).to.be.a('function');

            expect(response).to.have.property('once');
            expect(response.once).to.be.a('function');

            expect(response).to.have.property('removeListener');
            expect(response.removeListener).to.be.a('function');

            expect(response).to.have.property('removeAllListeners');
            expect(response.removeAllListeners).to.be.a('function');

            expect(response).to.have.property('setMaxListeners');
            expect(response.setMaxListeners).to.be.a('function');

            expect(response).to.have.property('listeners');
            expect(response.listeners).to.be.a('function');

            expect(response).to.have.property('emit');
            expect(response.emit).to.be.a('function');

            expect(response).to.have.property('prependListener');
            expect(response.prependListener).to.be.a('function');
        });

        it('should expose helper methods', () => {
            expect(response).to.have.property('_isEndCalled');
            expect(response._isEndCalled).to.be.a('function');

            expect(response).to.have.property('_getHeaders');
            expect(response._getHeaders).to.be.a('function');

            expect(response).to.have.property('_getLocals');
            expect(response._getLocals).to.be.a('function');

            expect(response).to.have.property('_getData');
            expect(response._getData).to.be.a('function');

            expect(response).to.have.property('_getStatusCode');
            expect(response._getStatusCode).to.be.a('function');

            expect(response).to.have.property('_isJSON');
            expect(response._isJSON).to.be.a('function');

            expect(response).to.have.property('_isUTF8');
            expect(response._isUTF8).to.be.a('function');

            expect(response).to.have.property('_isDataLengthValid');
            expect(response._isDataLengthValid).to.be.a('function');

            expect(response).to.have.property('_getRedirectUrl');
            expect(response._getRedirectUrl).to.be.a('function');

            expect(response).to.have.property('_getRenderView');
            expect(response._getRenderView).to.be.a('function');

            expect(response).to.have.property('_getRenderData');
            expect(response._getRenderData).to.be.a('function');
        });

        it('shoud initialize with default options', () => {
            expect(response.statusCode).to.equal(200);
            expect(response.cookies).to.deep.equal({});
            expect(response.locals).to.deep.equal({ a: 'b' });
        });
    });

    describe('Express Response methods', () => {
        describe('.cookie()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should set cookie, when called with, name and value', () => {
                const cookie = {
                    value: 'value',
                    options: undefined
                };
                response.cookie('name', cookie.value);
                expect(response.cookies.name).to.deep.equal(cookie);
            });

            it('should set cookie, when called with, name, value and options', () => {
                const cookie = {
                    value: 'value',
                    options: {
                        domain: 'foo.bar.com',
                        path: '/cookie/path'
                    }
                };
                response.cookie('name', cookie.value, cookie.options);
                expect(response.cookies.name).to.deep.equal(cookie);
            });

            it('should allow chaining', () => {
                const cookie = {
                    value: 'value',
                    options: {
                        domain: 'foo.bar.com',
                        path: '/cookie/path'
                    }
                };

                const chainedResponse = response.cookie('name', cookie.value, cookie.options);
                expect(chainedResponse).to.deep.equal(response);
            });
        });

        describe('.clearCookie()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should set an already expired date to the cookie, when called with existing cookie', () => {
                const cookie = {
                    value: '',
                    options: {
                        expires: new Date(1),
                        path: '/'
                    }
                };
                response.cookie('name', 'value');
                response.clearCookie('name');
                expect(response.cookies.name).to.deep.equal(cookie);
            });

            it('should keep the options of the cookie except expiration date and path, if provided', () => {
                const cookie = {
                    value: '',
                    options: {
                        expires: new Date(1),
                        path: '/',
                        domain: 'domain',
                        httpOnly: true
                    }
                };
                response.cookie('name', 'value');
                response.clearCookie('name', { expires: new Date(), path: '/path', domain: 'domain', httpOnly: true });
                expect(response.cookies.name).to.deep.equal(cookie);
            });

            it('should return silently, when called with non-existing cookie', () => {
                expect(response.clearCookie.bind(response, 'invalid')).not.to.throw();
            });

            it('should allow chaining', () => {
                response.cookie('name', 'value');
                const chainedResponse = response.clearCookie('name');
                expect(chainedResponse).to.deep.equal(response);
            });
        });

        describe('.status()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should set cookie, when called with, name and value', () => {
                response.status(404);
                expect(response.statusCode).to.equal(404);
            });

            it('should statusCode to undefined, when called without arguments', () => {
                response.status();
                expect(response.statusCode).to.be.a('undefined');
            });
        });

        describe('.sendStatus()', () => {
            let response;

            before(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'send');
            });

            after(() => {
                response.send.restore();
                response = null;
            });

            it('should set .statusCode, set .type to "text/plain", and call .send()', () => {
                response.sendStatus(404);
                expect(response.statusCode).to.equal(404);
                expect(response.get('Content-Type')).to.equal('text/plain');
                expect(response.send).to.have.callCount(1);
            });
        });

        describe('.contentType()/.type()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            it('should set "Content-Type"', () => {
                response.type('html');
                expect(response.get('Content-Type')).to.equal('text/html');
                response.contentType('txt');
                expect(response.get('Content-Type')).to.equal('text/plain');
            });

            it('should trow an error, when called without arguments', () => {
                expect(response.type).to.throw();
                expect(response.contentType).to.throw();
            });
        });

        describe('.vary()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'setHeader');
            });

            afterEach(() => {
                response.setHeader.restore();
                response = null;
            });

            it('should set vary header, when called with a single field', () => {
                response.vary('value1');
                expect(response.setHeader).to.have.been.calledWith('Vary', 'value1');
                expect(response.get('Vary')).to.equal('value1');
            });

            it('should set vary header, when called with a an array of fields', () => {
                response.vary(['value1', 'value2']);
                expect(response.setHeader).to.have.been.calledWith('Vary', 'value1, value2');
                expect(response.get('Vary')).to.equal('value1, value2');
            });

            it('should not duplicate vary header values (regardless of case)', () => {
                response.vary(['value1', 'value2']);
                response.vary(['Value1', 'VALUE2', 'value3']);
                expect(response.get('Vary')).to.equal('value1, value2, value3');
            });
        });

        describe('.append()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'setHeader');
            });

            afterEach(() => {
                response.setHeader.restore();
                response = null;
            });

            it('should append multiple headers', () => {
                response.append('Link', '<http://localhost/>');
                response.append('Link', '<http://localhost:80/>');

                expect(response.setHeader).to.have.callCount(2);
                expect(response.setHeader).to.have.been.calledWith('Link', '<http://localhost/>');
                expect(response.setHeader).to.have.been.calledWith('Link', [
                    '<http://localhost/>',
                    '<http://localhost:80/>'
                ]);

                expect(response.get('Link')).to.deep.equal(['<http://localhost/>', '<http://localhost:80/>']);
            });

            it('should accept array of values', () => {
                response.append('Set-Cookie', ['foo=bar', 'fizz=buzz']);
                expect(response.setHeader).to.have.been.calledWith('Set-Cookie', ['foo=bar', 'fizz=buzz']);
                expect(response.get('Set-Cookie')).to.deep.equal(['foo=bar', 'fizz=buzz']);
            });

            it('should get reset by res.set(field, val)', () => {
                response.append('Link', '<http://localhost/>');
                response.append('Link', '<http://localhost:80/>');
                response.set('Link', '<http://127.0.0.1/>');
                expect(response.setHeader).to.have.callCount(3);
                expect(response.get('Link')).to.equal('<http://127.0.0.1/>');
            });

            it('should work with res.set(field, val) first', () => {
                response.set('Link', '<http://localhost/>');
                response.append('Link', '<http://localhost:80/>');
                expect(response.setHeader).to.have.callCount(2);
                expect(response.get('Link')).to.deep.equal(['<http://localhost/>', '<http://localhost:80/>']);
            });
        });

        describe('.location()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            it('sets the Location header to the given path', () => {
                response.location('/a/nice/location');
                expect(response.get('Location')).to.equal('/a/nice/location');
            });

            it('returns the response object', () => {
                expect(response.location('')).to.equal(response);
            });
        });

        describe('.set()/.header()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'setHeader');
            });

            afterEach(() => {
                response.setHeader.restore();
                response = null;
            });

            it('should set header, when called with name and value strings', () => {
                response.set('name1', 'value1');
                expect(response.setHeader).to.have.been.calledWith('name1', 'value1');
                expect(response.get('name1')).to.equal('value1');

                response.header('name2', 'value2');
                expect(response.setHeader).to.have.been.calledWith('name2', 'value2');
                expect(response.get('name2')).to.equal('value2');
            });

            it('should convert value to string, when called with called with non-string value', () => {
                const num = 1;
                const obj = { key: 'value' };
                const bool = false;

                response.set('num', num);
                expect(response.setHeader).to.have.been.calledWith('num', num.toString());
                expect(response.get('num')).to.equal(num.toString());

                response.set('obj', obj);
                expect(response.setHeader).to.have.been.calledWith('obj', obj.toString());
                expect(response.get('obj')).to.equal(obj.toString());

                response.set('bool', bool);
                expect(response.setHeader).to.have.been.calledWith('bool', bool.toString());
                expect(response.get('bool')).to.equal(bool.toString());
            });

            it('returns the header value when called with only a key', () => {
                response.header('x', 'y');
                expect(response.header('x')).to.equal('y');
            });

            it('should set headers, when called with a hash of key/values', () => {
                const headers = {
                    name1: 'value1',
                    name2: 'value2'
                };

                response.set(headers);
                expect(response.setHeader).to.have.callCount(2);
                expect(response.setHeader).to.have.been.calledWith('name1', 'value1');
                expect(response.setHeader).to.have.been.calledWith('name2', 'value2');

                expect(response.get('name1')).to.equal('value1');
                expect(response.get('name2')).to.equal('value2');
            });
        });

        describe('.get()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should get header, when called existing header name', () => {
                response.set('name1', 'value1');
                expect(response.get('name1')).to.equal('value1');

                response.header('name2', 'value2');
                expect(response.get('name2')).to.equal('value2');
            });

            it('should throw and error, when called without arguments', () => {
                expect(response.get).to.throw();
                expect(response.getHeader).to.throw();
            });
        });

        describe('.redirect()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should mimic Express Response.redirect()');

            it('should redirect with status 302, when not specified', () => {
                const url = '/path/to/redirect';

                response.redirect(url);
                expect(response.statusCode).to.equal(302);
                expect(response._getRedirectUrl()).to.equal(url);
            });

            it('should redirect with status specified status', () => {
                const statusCode = 301;
                const url = '/path/to/redirect';

                response.redirect(statusCode, url);
                expect(response.statusCode).to.equal(statusCode);
                expect(response._getRedirectUrl()).to.equal(url);
            });
        });

        // TODO: fix in 2.0; method should mimic Express Response.render()
        describe('.render()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'emit');
            });

            afterEach(() => {
                response.emit.restore();
                response = null;
            });

            it('should mimic Express Response.render()');

            it('should accept view argument only', () => {
                const view = 'view';

                response.render(view);
                expect(response._getRenderView()).to.equal(view);
                expect(response._getRenderData()).to.deep.equal({});
                expect(response.emit).to.have.callCount(3);
                expect(response.emit).to.have.been.calledWith('render');
                expect(response.emit).to.have.been.calledWith('end');
                expect(response.emit).to.have.been.calledWith('finish');
            });

            it('should accept view and data arguments', () => {
                const view = 'view';
                const data = { key: 'value' };

                response.render(view, data);
                expect(response._getRenderView()).to.equal(view);
                expect(response._getRenderData()).to.deep.equal(data);
                expect(response.emit).to.have.callCount(3);
                expect(response.emit).to.have.been.calledWith('render');
                expect(response.emit).to.have.been.calledWith('end');
                expect(response.emit).to.have.been.calledWith('finish');
            });

            it('should accept view, data, and callback arguments', () => {
                const view = 'view';
                const data = { key: 'value' };
                const callback = sinon.stub();

                response.render(view, data, callback);

                expect(response._getRenderView()).to.equal(view);
                expect(response._getRenderData()).to.deep.equal(data);
                expect(callback).to.have.been.calledWith(null, '');
                expect(response.emit).not.to.have.callCount(1);
            });

            it('should accept view and callback arguments', () => {
                const view = 'view';
                const callback = sinon.stub();

                response.render(view, callback);

                expect(response._getRenderView()).to.equal(view);
                expect(response._getRenderData()).to.deep.equal({});
                expect(callback).to.have.been.calledWith(null, '');
                expect(response.emit).not.to.have.callCount(1);
            });
        });

        // TODO: fix in 2.0; method should mimic Express Response.send()
        describe('.send()', () => {
            it('should mimic Express Response.send()');

            it('should return the response', () => {
                const response = mockResponse.createResponse();
                expect(response.send({})).to.equal(response);
            });
        });

        // TODO: fix in 2.0; method should mimic Express Response.json()
        describe('.json()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'emit');
            });

            afterEach(() => {
                response.emit.restore();
                response = null;
            });

            it('method should mimic Express Response.json()');

            it('should emit send and end events', () => {
                response.json({});
                expect(response.emit).to.have.callCount(3);
                expect(response.emit).to.have.been.calledWith('send');
                expect(response.emit).to.have.been.calledWith('end');
                expect(response.emit).to.have.been.calledWith('finish');
            });

            it('should set data and statusCode if first argument is data and second is number', () => {
                response.json({}, 400);
                expect(response.statusCode).to.equal(400);
                expect(response._getData()).to.equal('{}');
            });

            it('should set data and statusCode if second argument is data and first is number', () => {
                response.json(400, {});
                expect(response.statusCode).to.equal(400);
                expect(response._getData()).to.equal('{}');
            });

            it('should set data to number if passed number as only argument', () => {
                response.json(400);
                expect(response.statusCode).to.equal(200);
                expect(response._getData()).to.equal('400');
            });

            it('should set data to "false" if passed false', () => {
                response.json(false);
                expect(response._getData()).to.equal('false');
            });

            it('should set data to "null" if passed null', () => {
                response.json(null);
                expect(response._getData()).to.equal('null');
            });

            it('should return the response', () => {
                expect(response.json(null)).to.equal(response);
            });

            // reference : https://github.com/howardabrams/node-mocks-http/pull/98
            it('should call .write()', () => {
                const originalWrite = response.write.bind(response);
                const hackedContent = JSON.stringify({ foo: 'bar' });
                response.write = function write(data, encoding) {
                    return originalWrite(hackedContent, encoding);
                };
                response.json({ hello: 'world' });
                expect(response._getData()).to.eql(hackedContent);
            });
        });

        // TODO: fix in 2.0; method should mimic Express Response.jsonp()
        describe('.jsonp()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
                sinon.spy(response, 'emit');
            });

            afterEach(() => {
                response.emit.restore();
                response = null;
            });

            it('method should mimic Express Response.jsonp()');

            it('should emit send and end events', () => {
                response.jsonp({});
                expect(response.emit).to.have.callCount(3);
                expect(response.emit).to.have.been.calledWith('send');
                expect(response.emit).to.have.been.calledWith('end');
                expect(response.emit).to.have.been.calledWith('finish');
            });

            it('should set data and statusCode if first argument is data and second is number', () => {
                response.jsonp({}, 400);
                expect(response.statusCode).to.equal(400);
                expect(response._getData()).to.equal('{}');
            });

            it('should set data and statusCode if second argument is data and first is number', () => {
                response.jsonp(400, {});
                expect(response.statusCode).to.equal(400);
                expect(response._getData()).to.equal('{}');
            });

            it('should set data to number if passed number as only argument', () => {
                response.jsonp(400);
                expect(response.statusCode).to.equal(200);
                expect(response._getData()).to.equal('400');
            });

            it('should set data to "false" if passed false', () => {
                response.jsonp(false);
                expect(response._getData()).to.equal('false');
            });

            it('should set data to "null" if passed null', () => {
                response.jsonp(null);
                expect(response._getData()).to.equal('null');
            });

            it('should return the response', () => {
                expect(response.jsonp(null)).to.equal(response);
            });
        });

        // TODO: fix in 2.0; method should mimic Express Response.redirect()
        describe('.redirect()', () => {
            it('method should mimic Express Response.redirect()');
        });

        describe('.format()', () => {
            let response;
            let request;

            beforeEach(() => {
                request = mockRequest.createRequest();
                response = mockResponse.createResponse({ req: request });
            });

            it('sends 406 when given no supported formats', () => {
                response.format({});
                expect(response.statusCode).to.equal(406);
                expect(response._getData()).to.equal('Not Acceptable');
            });

            it('throws when no request object is available', () => {
                response = mockResponse.createResponse();

                expect(() => {
                    response.format({ html() {} });
                }).to.throw(Error, /Request object unavailable/);
            });

            it('calls the handler for the closest accepted type', () => {
                const htmlSpy = sinon.spy();
                const jsonSpy = sinon.spy();

                request.headers.accept = 'application/json';
                response.format({ html: htmlSpy, json: jsonSpy });

                expect(htmlSpy).to.have.callCount(0);
                expect(jsonSpy).to.have.callCount(1);
            });

            it('sends 406 when no match is found', () => {
                const htmlSpy = sinon.spy();
                const jsonSpy = sinon.spy();

                request.headers.accept = 'text/xml';
                response.format({ html: htmlSpy, json: jsonSpy });

                expect(htmlSpy).to.have.callCount(0);
                expect(jsonSpy).to.have.callCount(0);
                expect(response.statusCode).to.equal(406);
            });

            it('runs default function if it exists and no match is found', () => {
                const defaultSpy = sinon.spy();
                response.format({ default: defaultSpy });
                expect(defaultSpy).to.have.callCount(1);
            });
        });

        describe('.attachment()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            it('adds Content-Disposition header', () => {
                response.attachment('download.csv');

                expect(response._headers).to.have.property('content-disposition');
                expect(response._headers['content-disposition']).to.be.equal('attachment; filename="download.csv"');
            });
        });
    });

    // TODO: fix in 2.0; methods should be inherited from Node ServerResponse
    describe('Node ServerResponse methods', () => {
        describe('.writeHead()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();

                expect(response.statusCode).to.equal(200);
                expect(response.statusMessage).to.equal('OK');
                expect(response.getHeaders()).to.be.empty;
            });

            afterEach(() => {
                response = null;
            });

            it('should inherit from ServerResponse.writeHead()');

            it('writes the statusCode of the response', () => {
                response.writeHead(400);
                expect(response.statusCode).to.equal(400);
            });

            it('writes the statusMessage of the response', () => {
                response.writeHead(400, 'NotOK');
                expect(response.statusMessage).to.equal('NotOK');
            });

            it('writes the headers of the response', () => {
                const headers = { 'x-header': 'test llama' };
                response.writeHead(400, headers);
                expect(response.getHeaders()).to.deep.equal(headers);
            });

            it('updates the headersSent property of the response', () => {
                const headers = { 'x-header': 'test llama' };
                response.writeHead(400, headers);
                // headers are only sent by node with first body byte
                expect(response.headersSent).to.equal(false);
                response.write('foo');
                expect(response.headersSent).to.equal(true);
                // further updates to headers shouldn't really be reflected in mock headers
                // since these would be transmitted as part of the body (probably breaking chunked encoding)
                // in real life.
                response.writeHead(500, { 'x-header': 'llama party' });
                // Should still see same as before
                expect(response.getHeaders()).to.deep.equal(headers);
            });

            it('works with statusMessage and headers as optional', () => {
                response.writeHead(400);
                expect(response.statusCode).to.equal(400);
                expect(response.statusMessage).to.equal('OK');
                expect(response.getHeaders()).to.be.empty;
            });

            it('works with statusMessage as optional', () => {
                const headers = { 'x-header': 'test llama' };
                response.writeHead(400, headers);
                expect(response.statusMessage).to.equal('OK');
                expect(response.getHeaders()).to.deep.equal(headers);
            });

            it('works with headers as optional', () => {
                response.writeHead(400, 'NotOK');
                expect(response.statusMessage).to.equal('NotOK');
                expect(response.getHeaders()).to.be.empty;
            });

            it('works with statusCode, statusMessage, and headers defined', () => {
                const headers = { 'x-header': 'test llama' };
                response.writeHead(400, 'NotOK', headers);
                expect(response.statusMessage).to.equal('NotOK');
                expect(response.getHeaders()).to.deep.equal(headers);
            });

            it('throws if end has already been called', () => {
                response.end();
                expect(response.writeHead.bind(response, 200)).to.throw('The end() method has already been called');
            });

            it('merges the given headers with the ones specified earlier (set with `setHeader`)', () => {
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.writeHead(200, { 'Access-Control-Max-Age': '86400' });
                expect(response.getHeaders()).to.contain.all.keys({
                    'access-control-allow-origin': '*',
                    'access-control-max-age': '86400'
                });
            });
        });
    });

    // TODO: fix in 2.0; methods should be inherited from Node OutogingMessage
    describe('Node OutogingMessage methods', () => {
        describe('.setHeader()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should set header, when called with name and value strings', () => {
                response.setHeader('name', 'value');
                expect(response.getHeader('name')).to.equal('value');
            });

            it('should throw an error when called without arguments', () => {
                expect(response.setHeader).to.throw();
            });

            it('should return this', () => {
                expect(response.setHeader('name', 'value')).to.equal(response);
            });
        });

        describe('.getHeader()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should get header, when called existing header', () => {
                response.set('name1', 'value1');
                expect(response.getHeader('name1')).to.equal('value1');

                response.header('name2', 'value2');
                expect(response.getHeader('name2')).to.equal('value2');
            });

            it('should get header regardless of case, when called existing header', () => {
                response.set('NAME1', 'value1');
                expect(response.getHeader('name1')).to.equal('value1');

                response.header('name2', 'value2');
                expect(response.getHeader('NAME2')).to.equal('value2');

                response.header('Name3', 'value3');
                expect(response.getHeader('name3')).to.equal('value3');
            });

            it('should throw and error, when called without arguments', () => {
                expect(response.getHeader).to.throw();
            });
        });

        describe('.getHeaderNames()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should return an empty array when no headers were set', () => {
                expect(response.getHeaderNames()).to.deep.equal([]);
            });

            it('should return names of headers previously set', () => {
                response.setHeader('name1', 'value1');
                response.setHeader('name2', 'value2');

                expect(response.getHeaderNames()).to.deep.equal(['name1', 'name2']);
            });
        });

        describe('.getHeaders()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should return an empty object when no headers were set', () => {
                expect(response.getHeaders()).to.deep.equal({});
            });

            it('should return headers previously set', () => {
                response.setHeader('name1', 'value1');
                response.setHeader('name2', 'value2');

                const headers = response.getHeaders();

                expect(headers.name1).to.equal('value1');
                expect(headers.name2).to.equal('value2');
            });

            it('should return a shallow copy', () => {
                const array = [1, 2];

                response.setHeader('name1', array);
                const headers = response.getHeaders();

                expect(headers.name1).not.to.equal(array);
                expect(headers.name1).to.deep.equal(array);
            });
        });

        describe('.hasHeader()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should return true if the header was set', () => {
                response.setHeader('name1');
                expect(response.hasHeader('name1')).to.equal(true);
            });

            it('should return false if the header is missing', () => {
                expect(response.hasHeader('name1')).to.equal(false);
            });

            it('should be case-insensitive', () => {
                response.setHeader('name1');
                expect(response.hasHeader('NAME1')).to.equal(true);
            });
        });

        describe('.removeHeader()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            afterEach(() => {
                response = null;
            });

            it('should delete header, when with called existing header', () => {
                response.set('namer1');
                response.removeHeader('name1');
                expect(response.getHeader('name1')).to.be.a('undefined');
            });

            it('should delete header regardless of case, when called existing header', () => {
                response.set('NAME1', 'value1');
                response.removeHeader('name1');
                expect(response.getHeader('name1')).to.be.a('undefined');

                response.set('name2', 'value2');
                response.removeHeader('name2');
                expect(response.getHeader('NAME2')).to.be.a('undefined');

                response.set('Name3', 'value3');
                response.removeHeader('name3');
                expect(response.getHeader('name3')).to.be.a('undefined');
            });

            it('should exit silently, when with called non-existing header', () => {
                expect(response.getHeader('name2')).to.be.a('undefined');
                response.removeHeader('name2');
            });

            it('should throw and error, when called without arguments', () => {
                expect(response.removeHeader).to.throw();
            });
        });

        describe('.write()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            it('should accept a string and hold it in _data', () => {
                const payload1 = 'payload1';
                const encoding = 'utf8';
                response.write(payload1, encoding);
                expect(response._getData()).to.equal(payload1);
                expect(response.getEncoding()).to.equal(encoding);
            });

            it('should accept multiple strings and concatenate them in _data', () => {
                const payload1 = 'payload1';
                const payload2 = 'payload2';
                response.write(payload1);
                response.write(payload2);
                expect(response._getData()).to.equal(payload1 + payload2);
            });

            it('should accept a buffer and hold it in _chunks', () => {
                const payload1 = 'payload1';
                response.write(Buffer.from(payload1));
                const chunks = response._getChunks();
                expect(chunks.length).to.eql(1);
                expect(chunks[0].toString()).to.equal(payload1);
            });

            it('should accept multiple buffers and hold them in _chunks', () => {
                const payload1 = 'payload1';
                const payload2 = 'payload2';
                response.write(Buffer.from(payload1));
                response.write(Buffer.from(payload2));
                const chunks = response._getChunks();
                expect(chunks.length).to.eql(2);
                expect(chunks[0].toString()).to.equal(payload1);
                expect(chunks[1].toString()).to.equal(payload2);
            });

            it('should inherit from Node OutogingMessage.write()');
        });

        describe('.end()', () => {
            let response;

            beforeEach(() => {
                response = mockResponse.createResponse();
            });

            // Issue 119
            it('only emits end once', () => {
                let emits = 0;
                response.emit = function emit(event) {
                    if (event === 'end') {
                        emits += 1;
                    }
                };
                response.end();
                response.end();
                expect(emits).to.eql(1);
            });

            it('should set writableEnded to true', () => {
                response.end();
                expect(response.writableEnded).to.eql(true);
                expect(response.writableFinished).to.eql(true);
            });

            it('writes to _data if a string is supplied', () => {
                const payload1 = 'payload1';
                const encoding = 'utf8';
                response.end(payload1, encoding);
                expect(response._getData()).to.equal(payload1);
                expect(response.getEncoding()).to.equal(encoding);
            });

            it('writes to _buffer if a Buffer is supplied', () => {
                const payload1 = 'payload1';
                response.end(Buffer.from(payload1));
                const buffer = response._getBuffer();
                expect(buffer.toString()).to.equal(payload1);
            });

            it('should inherit from Node OutogingMessage.end()');

            it('triggers callback provided as 1st argument', () => {
                const callback = sinon.spy();
                response.end(callback);

                expect(callback).to.have.callCount(1);
            });

            it('triggers callback provided as 2nd argument', () => {
                const payload = 'random-text';
                const callback = sinon.spy();
                response.end(Buffer.from(payload), callback);

                expect(callback).to.have.callCount(1);
                expect(response._getBuffer().toString()).to.equal(payload);
            });

            it('triggers callback provided as 3rd argument', () => {
                const payload = 'random-text';
                const callback = sinon.spy();
                response.end(Buffer.from(payload), 'utf8', callback);

                expect(callback).to.have.callCount(1);
                expect(response._getBuffer().toString()).to.equal(payload);
            });
        });
    });

    describe('write() + end() interactions', () => {
        let response;

        beforeEach(() => {
            response = mockResponse.createResponse();
        });

        it('should accept strings through write() and end() and concatenate them in _data', () => {
            const payload1 = 'payload1';
            const payload2 = 'payload2';
            response.write(payload1);
            response.end(payload2);
            expect(response._getData()).to.equal(payload1 + payload2);
        });

        it('should accept buffers through write() and end() and concatenate them in _buffer', () => {
            const payload1 = 'payload1';
            const payload2 = 'payload2';
            response.write(Buffer.from(payload1));
            response.end(Buffer.from(payload2));
            const buffer = response._getBuffer();
            expect(buffer.toString()).to.equal(payload1 + payload2);
        });
    });

    // TODO: fix in 2.0; methods should be inherited from Node WritableStream
    describe('node WritableStream methods', () => {
        describe('.destroy()', () => {
            it('should inherit from Node WritableStream.destroy()');
        });

        describe('.destroySoon()', () => {
            it('should inherit from Node WritableStream.destroySoon()');
        });
    });

    // TODO: fix in 2.0; methods should be inherited from Node EventEmitter
    describe('node EventEmitter methods', () => {
        describe('.addListener()', () => {
            it('should inherit from Node EventEmitter.addListener()');
        });

        describe('.on()', () => {
            it('should inherit from Node EventEmitter.on()');
        });

        describe('.once()', () => {
            it('should inherit from Node EventEmitter.once()');
        });

        describe('.removeListener()', () => {
            it('should inherit from Node EventEmitter.removeListener()');
        });

        describe('.removeAllListeners()', () => {
            it('should inherit from Node EventEmitter.removeAllListeners()');
        });

        describe('.setMaxListeners()', () => {
            it('should inherit from Node EventEmitter.setMaxListeners()');
        });

        describe('.listeners()', () => {
            it('should inherit from Node EventEmitter.listeners()');
        });

        describe('.emit()', () => {
            it('should inherit from Node EventEmitter.emit()');
        });

        describe('.prependListener()', () => {
            it('should inherit from Node EventEmitter.prependListener()');
        });
    });

    // TODO: deprecate helper methods in 2.0
    describe('helper methods', () => {
        let response;

        beforeEach(() => {
            response = mockResponse.createResponse();
        });

        afterEach(() => {
            response = null;
        });

        describe('._isEndCalled()', () => {
            it('will be deprecated in 2.0');

            it("should return false when .end() hasn't been called", () => {
                expect(response._isEndCalled()).to.equal(false);
            });

            it('should return true when .end() has been called', () => {
                response.end();
                expect(response._isEndCalled()).to.equal(true);
            });
        });

        describe('._getHeaders()', () => {
            it('will be deprecated in 2.0');

            it('should return empty object when no headers have been set', () => {
                expect(response._getHeaders()).to.deep.equal({});
            });

            it('should return true when .end() has been called', () => {
                const headers = {
                    'content-type': 'text/plain'
                };
                response.type('txt');
                expect(response._getHeaders()).to.deep.equal(headers);
            });
        });

        describe('._getLocals()', () => {
            it('should return empty object when no locals have been set', () => {
                expect(response._getLocals()).to.deep.equal({});
            });

            it('should set the locals -object correctly', () => {
                const locals = {
                    token: 'Test'
                };
                response.locals = locals;
                expect(response._getLocals()).to.deep.equal(locals);
            });
        });

        describe('._getData()', () => {
            it('will be deprecated in 2.0');

            it('should return empty string when no data has been sent', () => {
                expect(response._getData()).to.equal('');
            });

            it('should return empty string when sent data is undefined', () => {
                response.send(undefined);
                expect(response._getData()).to.equal('');
            });

            it('should return sent data', () => {
                response.send('data');
                expect(response._getData()).to.equal('data');
            });
        });

        describe('._getJSONData()', () => {
            it('will be deprecated in 2.0');

            it('should return sent data', () => {
                const data = { a: 1, b: { c: 2 } };
                response.send(JSON.stringify(data));
                expect(response._getJSONData()).to.deep.equal(data);
            });
        });

        describe('._getStatusCode()', () => {
            it('will be deprecated in 2.0');

            it('should return default status code, when not set', () => {
                expect(response._getStatusCode()).to.equal(200);
            });

            it('should return set status code', () => {
                response.status(404);
                expect(response._getStatusCode()).to.equal(404);
            });
        });

        describe('._getStatusMessage()', () => {
            it('will be deprecated in 2.0');

            it('should return the default status message, when not set', () => {
                expect(response._getStatusMessage()).to.equal('OK');
            });

            it('should return set status message', () => {
                response.statusMessage = 'NotOK';
                expect(response._getStatusMessage()).to.equal('NotOK');
            });

            it('should return status message set by .writeHead()', () => {
                response.writeHead(400, 'NotOK');
                expect(response._getStatusMessage()).to.equal('NotOK');
            });
        });

        describe('._isJSON()', () => {
            it('will be deprecated in 2.0');

            it('should return true, when Content-Type is JSON', () => {
                response.type('json');
                expect(response._isJSON()).to.equal(true);
            });

            it('should return false, when Content-Type is not JSON', () => {
                response.type('html');
                expect(response._isJSON()).to.equal(false);
            });
        });

        describe('._isUTF8()', () => {
            it('will be deprecated in 2.0');

            it('should return false, when enconding is not UTF-8', () => {
                expect(response._isUTF8()).to.equal(false);
            });

            it('should return true, when enconding is UTF-8', () => {
                response.setEncoding('utf8');
                expect(response._isUTF8()).to.equal(true);
            });
        });

        describe('._isDataLengthValid()', () => {
            it('will be deprecated in 2.0');

            it('should return true, when Content-Length not present', () => {
                expect(response._isDataLengthValid()).to.equal(true);
            });

            it('should return true, when Content-Length equals data size', () => {
                response.send('data');
                response.header('Content-Length', '4');
                expect(response._isDataLengthValid()).to.equal(true);
            });

            it('should return false, when Content-Length does not equal data size', () => {
                response.send('data');
                response.header('Content-Length', '5');
                expect(response._isDataLengthValid()).to.equal(false);
            });
        });

        describe('._getRedirectUrl()', () => {
            it('will be deprecated in 2.0');

            it('should return empty string, when .redirect() not called', () => {
                expect(response._getRedirectUrl()).to.equal('');
            });

            it('should return redirect url', () => {
                const url = '/path/to/redirect';
                response.redirect(url);
                expect(response._getRedirectUrl()).to.equal(url);
            });
        });

        describe('._getRenderView()', () => {
            it('will be deprecated in 2.0');

            it('should return empty string, when .render() not called', () => {
                expect(response._getRenderView()).to.equal('');
            });

            it('should return name of rendered view', () => {
                const view = 'view';
                response.render(view);
                expect(response._getRenderView()).to.equal(view);
            });
        });

        describe('._getRenderData()', () => {
            it('will be deprecated in 2.0');

            it('should return empty object, when .render() not called', () => {
                expect(response._getRenderData()).to.deep.equal({});
            });

            it('should return empty object, when .render() called without data', () => {
                response.render('view');
                expect(response._getRenderData()).to.deep.equal({});
            });

            it('should return data object, when .render() called with data', () => {
                const data = {
                    key: 'value'
                };
                response.render('view', data);
                expect(response._getRenderData()).to.deep.equal(data);
            });
        });
    });
});
