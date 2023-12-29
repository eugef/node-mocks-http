const chai = require('chai');

const { expect } = chai;
const url = require('url');
const querystring = require('querystring');
const parseRange = require('range-parser');
const eventEmitter = require('events').EventEmitter;

const mockRequest = require('../../lib/mockRequest');

describe('mockRequest', () => {
    it('should expose .createRequest()', () => {
        expect(mockRequest.createRequest).to.be.a('function');
    });

    describe('.createRequest()', () => {
        let request;

        describe('without options', () => {
            before(() => {
                request = mockRequest.createRequest();
            });

            it('should have event emitter prototype functions', () => {
                expect(request.on).to.be.a('function');
                expect(request.once).to.be.a('function');
                expect(request.emit).to.be.a('function');
            });

            it('should return an object', () => {
                expect(request).to.be.an('object');
            });

            it('should be an EventEmitter', () => {
                expect(request).to.be.an.instanceof(eventEmitter);
            });

            it('should expose Express Request object methods', () => {
                expect(request).to.have.property('get');
                expect(request.get).to.be.a('function');

                expect(request).to.have.property('header');
                expect(request.header).to.be.a('function');

                expect(request).to.have.property('param');
                expect(request.param).to.be.a('function');
            });

            it('shoud initialize with default options', () => {
                expect(request.method).to.equal('GET');
                expect(request.url).to.equal('');
                expect(request.originalUrl).to.equal(request.url);
                expect(request.baseUrl).to.equal(request.url);
                expect(request.path).to.equal('');
                expect(request.params).to.deep.equal({});
                expect(request.session).to.be.a('undefined');
                expect(request.cookies).to.deep.equal({});
                expect(request.signedCookies).to.be.a('undefined');
                expect(request.headers).to.deep.equal({});
                expect(request.body).to.deep.equal({});
                expect(request.query).to.deep.equal({});
                expect(request.files).to.deep.equal({});
                expect(request.ip).to.equal('127.0.0.1');
                expect(request.ips).to.deep.equal([request.ip]);
            });
        });

        describe('with options', () => {
            afterEach(() => {
                request = null;
            });

            it('should set .method to options.method', () => {
                const options = {
                    method: 'POST'
                };

                request = mockRequest.createRequest(options);
                expect(request.method).to.equal(options.method);
            });

            it('should set .url to options.url', () => {
                const options = {
                    url: '/this/is/a/url'
                };

                request = mockRequest.createRequest(options);
                expect(request.url).to.equal(options.url);
                expect(request.originalUrl).to.equal(options.url);
                expect(request.baseUrl).to.equal(options.url);
            });

            it('should set .url automatically', () => {
                const options = {
                    path: '/this/is/a/path'
                };

                const expectedUrl = '/this/is/a/path';

                request = mockRequest.createRequest(options);
                expect(request.url).to.equal(expectedUrl);
            });

            it('should set .baseUrl to options.baseUrl', () => {
                const options = {
                    baseUrl: '/this'
                };

                request = mockRequest.createRequest(options);
                expect(request.baseUrl).to.equal(options.baseUrl);
            });

            it('should set .originalUrl to options.originalUrl', () => {
                const options = {
                    originalUrl: '/this/is/a/url'
                };

                request = mockRequest.createRequest(options);
                expect(request.originalUrl).to.equal(options.originalUrl);
            });

            it('should set .path to options.path', () => {
                const options = {
                    path: '/this/is/a/path'
                };

                request = mockRequest.createRequest(options);
                expect(request.path).to.equal(options.path);
            });

            it('should set .path to pathname of options.url', () => {
                const options = {
                    url: '/this/is/a/url'
                };

                request = mockRequest.createRequest(options);
                expect(request.path).to.equal(url.parse(options.url).pathname);
            });

            it('should set .params to options.params', () => {
                const options = {
                    params: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.params).to.deep.equal(options.params);
            });

            it('should set .session to options.session', () => {
                const options = {
                    session: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.session).to.deep.equal(options.session);
            });

            it('should set .cookies to options.cookies', () => {
                const options = {
                    cookies: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.cookies).to.deep.equal(options.cookies);
            });

            it('should set .signedCookies to options.signedCookies', () => {
                const options = {
                    signedCookies: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.signedCookies).to.deep.equal(options.signedCookies);
            });

            it('should set .headers to options.headers', () => {
                const options = {
                    headers: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.headers).to.deep.equal(options.headers);
            });

            it('should set .headers to options.headers and be accessible via get() and header() case-insensitively', () => {
                const options = {
                    headers: {
                        KEY1: 'value1',
                        Key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.header('KEY1')).to.equal('value1');
                expect(request.get('KEY1')).to.equal('value1');
                expect(request.getHeader('KEY1')).to.equal('value1');
                expect(request.header('KEY2')).to.equal('value2');
                expect(request.get('KEY2')).to.equal('value2');
                expect(request.getHeader('KEY2')).to.equal('value2');
            });

            it('should set .body to options.body', () => {
                const options = {
                    body: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.body).to.deep.equal(options.body);
            });

            it('should set .query to options.query', () => {
                const options = {
                    query: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.query).to.deep.equal(options.query);
            });

            it('should set .files to options.files', () => {
                const options = {
                    files: {
                        key1: 'value1',
                        key2: 'value2'
                    }
                };

                request = mockRequest.createRequest(options);
                expect(request.files).to.deep.equal(options.files);
            });

            it('should set .query to url query params when options.query not set', () => {
                const options = {
                    url: '/path/to/url?key1=value1&key2=value2'
                };
                const parsedOptions = querystring.parse(options.url.split('?')[1]);

                request = mockRequest.createRequest(options);
                expect(request.query).to.deep.equal(parsedOptions);
            });

            it('should accept and set non-standard options passed to it', () => {
                const options = {
                    mySampleProp: 'la LA LA'
                };

                request = mockRequest.createRequest(options);
                expect(request.mySampleProp).to.equal('la LA LA');
            });

            it('should set .ip to options.ip', () => {
                const options = {
                    ip: '192.168.1.1'
                };

                request = mockRequest.createRequest(options);
                expect(request.ip).to.equal(options.ip);
            });

            it('should set .ips to [options.ip]', () => {
                const options = {
                    ip: '192.168.1.1'
                };

                request = mockRequest.createRequest(options);
                expect(request.ips).to.deep.equal([options.ip]);
            });
        });
    });

    describe('.get()/.header()', () => {
        let request;

        afterEach(() => {
            request = null;
        });

        it('should return header, when set', () => {
            const options = {
                headers: {
                    key: 'value'
                }
            };
            request = mockRequest.createRequest(options);
            expect(request.get('key')).to.equal('value');
            expect(request.header('key')).to.equal('value');
            expect(request.getHeader('key')).to.equal('value');
        });

        it('should return referer, when request as referrer', () => {
            const options = {
                headers: {
                    referer: 'value'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.get('referrer')).to.equal('value');
            expect(request.header('referrer')).to.equal('value');
            expect(request.getHeader('referrer')).to.equal('value');
        });

        it('should return referrer, when request as referer', () => {
            const options = {
                headers: {
                    referrer: 'value'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.get('referer')).to.equal('value');
            expect(request.header('referer')).to.equal('value');
            expect(request.getHeader('referer')).to.equal('value');
        });

        it('should not return header, when not set', () => {
            request = mockRequest.createRequest();
            expect(request.get('key')).to.be.a('undefined');
            expect(request.header('key')).to.be.a('undefined');
            expect(request.getHeader('key')).to.be.a('undefined');
        });
    });

    describe('.is()', () => {
        let request;

        afterEach(() => {
            request = null;
        });

        it('should return type, when found in content-type header', () => {
            const options = {
                headers: {
                    'content-type': 'text/html',
                    'transfer-encoding': 'chunked'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.is('html')).to.equal('html');
        });

        it('should return first matching type, given array of types', () => {
            const options = {
                headers: {
                    'content-type': 'text/html',
                    'transfer-encoding': 'chunked'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.is(['json', 'html', 'text'])).to.equal('html');
        });

        it('should return false when type not found', () => {
            const options = {
                headers: {
                    'content-type': 'text/html',
                    'transfer-encoding': 'chunked'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.is(['json'])).to.equal(false);
        });
    });

    describe('.accepts()', () => {
        let request;

        beforeEach(() => {
            request = mockRequest.createRequest({ headers: { accept: 'text/html' } });
        });

        it('returns type if the same as Accept header', () => {
            expect(request.accepts('text/html')).to.equal('text/html');
            expect(request.accepts('html')).to.equal('html');
        });

        it('returns the first matching type of an array of types', () => {
            expect(request.accepts(['json', 'html'])).to.equal('html');
        });

        it('returns false when types dont match', () => {
            expect(request.accepts(['json', 'xml'])).to.equal(false);
        });
    });

    describe('.acceptsEncodings()', () => {
        let request;

        beforeEach(() => {
            request = mockRequest.createRequest({ headers: { 'Accept-Encoding': 'gzip' } });
        });

        it('returns type if the same as Accept-Encoding header', () => {
            expect(request.acceptsEncodings('gzip')).to.equal('gzip');
        });

        it('returns the first matching type of an array of types', () => {
            expect(request.acceptsEncodings(['compress', 'gzip'])).to.equal('gzip');
        });

        it('returns false when types dont match', () => {
            expect(request.acceptsEncodings(['compress', 'deflate'])).to.equal(false);
        });
    });

    describe('.acceptsCharsets()', () => {
        let request;

        beforeEach(() => {
            request = mockRequest.createRequest({ headers: { 'Accept-Charset': 'utf-8' } });
        });

        it('returns type if the same as Accept-Charset header', () => {
            expect(request.acceptsCharsets('utf-8')).to.equal('utf-8');
        });

        it('returns the first matching type of an array of types', () => {
            expect(request.acceptsCharsets(['iso-8859-15', 'utf-8'])).to.equal('utf-8');
        });

        it('returns false when types dont match', () => {
            expect(request.acceptsCharsets(['iso-8859-15', 'us-ascii'])).to.equal(false);
        });
    });

    describe('.acceptsLanguages()', () => {
        let request;

        beforeEach(() => {
            request = mockRequest.createRequest({ headers: { 'Accept-Language': 'en-GB' } });
        });

        it('returns type if the same as Accept-Language header', () => {
            expect(request.acceptsLanguages('en-GB')).to.equal('en-GB');
        });

        it('returns the first matching type of an array of types', () => {
            expect(request.acceptsLanguages(['de-DE', 'en-GB'])).to.equal('en-GB');
        });

        it('returns false when types dont match', () => {
            expect(request.acceptsLanguages(['de-DE', 'fr-FR'])).to.equal(false);
        });
    });

    describe('.range()', () => {
        let request;

        afterEach(() => {
            request = null;
        });

        it('returns undefined if there is no Range header', () => {
            request = mockRequest.createRequest();
            expect(request.range()).to.be.an('undefined');
        });

        const tests = [
            {
                // Unsatisfiable
                header: 'bytes=90-100',
                size: 10
            },
            {
                // Malformed
                header: 'by90-100',
                size: 10
            },
            {
                // Basic range
                header: 'bytes=50-55',
                size: 100
            },
            {
                // Complex, without options
                header: 'bytes=50-55,0-10,5-10,56-60',
                size: 100
            },
            {
                // With options
                header: 'bytes=50-55,0-10,5-10,56-60',
                size: 100,
                options: {
                    combine: true
                }
            }
        ];

        tests.forEach((t) => {
            it(`returns the result of range-parser if there is a Range header of ${t.header} using size: ${t.size}`, () => {
                request = mockRequest.createRequest({ headers: { range: t.header } });
                expect(request.range(t.size, t.options)).to.deep.equal(parseRange(t.size, t.header, t.options));
            });
        });
    });

    describe('.param()', () => {
        let request;

        afterEach(() => {
            request = null;
        });

        it('should return param, when found in params', () => {
            const options = {
                params: {
                    key: 'value'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.param('key')).to.equal('value');
        });

        it('should return falsy param, when found in params', () => {
            const options = {
                params: {
                    key: 0
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.param('key')).to.equal(0);
        });

        it('should return param, when found in body', () => {
            const options = {
                body: {
                    key: 'value'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.param('key')).to.equal('value');
        });

        it('should return falsy param, when found in body', () => {
            const options = {
                body: {
                    key: 0
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.param('key')).to.equal(0);
        });

        it('should return param, when found in query', () => {
            const options = {
                query: {
                    key: 'value'
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.param('key')).to.equal('value');
        });

        it('should return falsy param, when found in query', () => {
            const options = {
                query: {
                    key: 0
                }
            };

            request = mockRequest.createRequest(options);
            expect(request.param('key')).to.equal(0);
        });

        it('should not return param, when not found in params/body/query', () => {
            request = mockRequest.createRequest();
            expect(request.get('key')).to.be.a('undefined');
            expect(request.header('key')).to.be.a('undefined');
        });

        it('should return defaultValue, when not found in params/body/query', () => {
            request = mockRequest.createRequest();
            expect(request.get('key')).to.be.a('undefined');
            expect(request.param('key', 'defaultValue')).to.equal('defaultValue');
        });

        it('should return undefined, when not found in params/body/query', () => {
            request = mockRequest.createRequest();
            expect(request.get('key')).to.be.a('undefined');
            expect(request.param('key')).to.be.an('undefined');
        });
    });

    describe('helper functions', () => {
        let request;

        beforeEach(() => {
            request = mockRequest.createRequest();
        });

        afterEach(() => {
            request = null;
        });

        describe('._setParameter()', () => {
            it('should set param, when called with key and value', () => {
                request._setParameter('key', 'value');
                expect(request.param('key')).to.equal('value');
            });

            it('should unset param, when called with key and no value', () => {
                request._setParameter('key', 'value');
                request._setParameter('key');
                expect(request.param('key')).to.be.a('undefined');
            });
        });

        describe('._setSessionVariable()', () => {
            it('should set session variable, when called with key and value', () => {
                request._setSessionVariable('key', 'value');
                expect(request.session.key).to.equal('value');
            });

            it('should unset session variable, when called with key and no value', () => {
                request._setSessionVariable('key', 'value');
                request._setSessionVariable('key');
                expect(request.param('key')).to.be.a('undefined');
            });
        });

        describe('._setCookiesVariable()', () => {
            it('should set cookie, when called with key and value', () => {
                request._setCookiesVariable('key', 'value');
                expect(request.cookies.key).to.equal('value');
            });

            it('should unset cookie, when called with key and no value', () => {
                request._setCookiesVariable('key', 'value');
                request._setCookiesVariable('key');
                expect(request.cookies.key).to.be.a('undefined');
            });
        });

        describe('._setSignedCookiesVariable()', () => {
            it('should set signed cookie, when called with key and value', () => {
                request._setSignedCookiesVariable('key', 'value');
                expect(request.signedCookies.key).to.equal('value');
            });

            it('should unset signed cookie, when called with key and no value', () => {
                request._setSignedCookiesVariable('key', 'value');
                request._setSignedCookiesVariable('key');
                expect(request.signedCookies.key).to.be.a('undefined');
            });
        });

        describe('._setHeadersVariable()', () => {
            it('should set header, when called with key and value', () => {
                request._setHeadersVariable('key', 'value');
                expect(request.get('key')).to.equal('value');
                expect(request.header('key')).to.equal('value');
                expect(request.getHeader('key')).to.equal('value');
            });

            it('should throw an error, when called with missing arguments', () => {
                expect(request._setHeadersVariable).to.throw();
            });
        });

        describe('._setFilesVariable()', () => {
            it('should set file, when called with key and value', () => {
                request._setFilesVariable('key', 'value');
                expect(request.files.key).to.equal('value');
            });

            it('should unset file, when called with key and no value', () => {
                request._setFilesVariable('key', 'value');
                request._setFilesVariable('key');
                expect(request.files.key).to.be.a('undefined');
            });
        });

        describe('._setMethod()', () => {
            it('should set method, when called with value', () => {
                const value = 'HEAD';
                request._setMethod(value);
                expect(request.method).to.equal(value);
            });

            it('should unset method, when called with no arguments', () => {
                request._setMethod();
                expect(request.method).to.be.a('undefined');
            });
        });

        describe('._setURL()', () => {
            it('should set url, when called with value', () => {
                const value = '/path/to/url';
                request._setURL(value);
                expect(request.url).to.equal(value);
            });

            it('should unset url, when called with no arguments', () => {
                request._setURL();
                expect(request.url).to.be.a('undefined');
            });
        });

        describe('._setBaseUrl()', () => {
            it('should set baseUrl, when called with value', () => {
                const value = '/path';
                request._setBaseUrl(value);
                expect(request.baseUrl).to.equal(value);
            });

            it('should unset baseUrl, when called with no arguments', () => {
                request._setBaseUrl();
                expect(request.baseUrl).to.be.a('undefined');
            });
        });

        describe('._setOriginalUrl()', () => {
            it('should set originalUrl, when called with value', () => {
                const value = '/path/to/url';
                request._setOriginalUrl(value);
                expect(request.originalUrl).to.equal(value);
            });

            it('should unset originalUrl, when called with no arguments', () => {
                request._setOriginalUrl();
                expect(request.originalUrl).to.be.a('undefined');
            });
        });

        describe('._setBody()', () => {
            it('should set body, when called with value', () => {
                const value = {
                    key1: 'value1',
                    key2: 'value2'
                };
                request._setBody(value);
                expect(request.body).to.deep.equal(value);
            });

            it('should unset body, when called with no arguments', () => {
                request._setBody();
                expect(request.body).to.be.a('undefined');
            });
        });

        describe('._addBody()', () => {
            it('should add body variable, when called with key and value', () => {
                request._addBody('key', 'value');
                expect(request.body.key).to.equal('value');
            });

            it('should unset body variable, when called with key and no value', () => {
                request._addBody('key', 'value');
                request._addBody('key');
                expect(request.body.key).to.be.a('undefined');
            });
        });

        describe('.send()', () => {
            it('should trigger data and end event when string is given', (done) => {
                let data = [];
                request.on('data', (chunk) => {
                    data.push(chunk);
                });
                request.on('end', () => {
                    data = Buffer.concat(data).toString();
                    expect(data).to.equal('test data');
                    done();
                });
                request.send('test data');
            });

            it('should trigger data and end event when object is given', (done) => {
                let data = [];
                const dataTosend = { key: 'value' };
                request.on('data', (chunk) => {
                    data.push(chunk);
                });
                request.on('end', () => {
                    data = Buffer.concat(data).toString();
                    expect(JSON.parse(data)).to.deep.equal(dataTosend);
                    done();
                });
                request.send(dataTosend);
            });

            it('should trigger data and end event when number is given', (done) => {
                let data = [];
                request.on('data', (chunk) => {
                    data.push(chunk);
                });
                request.on('end', () => {
                    data = Buffer.concat(data).toString();
                    expect(data).to.equal('35');
                    done();
                });
                request.send(35);
            });

            it('should trigger data and end event when buffer is given', (done) => {
                let data = [];
                const bufferdata = Buffer.from('test data');
                request.on('data', (chunk) => {
                    data.push(chunk);
                });
                request.on('end', () => {
                    data = Buffer.concat(data).toString();
                    expect(data).to.equal('test data');
                    done();
                });
                request.send(bufferdata);
            });

            it('should trigger data and end event when nothing is given', (done) => {
                let data = [];
                request.on('data', (chunk) => {
                    data.push(chunk);
                });
                request.on('end', () => {
                    data = Buffer.concat(data).toString();
                    expect(data).to.equal('');
                    done();
                });
                request.send();
            });
        });

        describe('.hostname', () => {
            it("should return the host's main domain", () => {
                const options = {
                    headers: {
                        host: 'tobi.ferrets.example.com:5000'
                    }
                };
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('tobi.ferrets.example.com');

                options.headers.host = 'tobi.ferrets.example.com';
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('tobi.ferrets.example.com');

                options.headers.host = 'example.com';
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('example.com');

                options.headers.host = 'example.com:8443';
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('example.com');

                options.headers.host = 'localhost:3000';
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('localhost');
            });

            it('should return an empty string', () => {
                const options = {
                    headers: {
                        key1: 'key1'
                    }
                };
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('');
            });

            it('should return an predefined hostname', () => {
                const options = {
                    hostname: 'predefined.host.com',
                    headers: {
                        host: 'other.host'
                    }
                };
                request = mockRequest.createRequest(options);
                expect(request.hostname).to.equal('predefined.host.com');
            });
        });

        describe('.subdomains', () => {
            it('should returns the host subdomains', () => {
                const options = {
                    headers: {
                        host: 'tobi.ferrets.example.com'
                    }
                };
                request = mockRequest.createRequest(options);
                expect(request.subdomains).to.be.an('array').that.includes('ferrets');
                expect(request.subdomains).to.be.an('array').that.includes('tobi');
            });

            it('should returns and empty array', () => {
                const options = {
                    headers: {
                        key1: 'key1'
                    }
                };
                request = mockRequest.createRequest(options);
                expect(request.subdomains).to.be.an('array').to.have.lengthOf(0);

                options.headers.host = 'example.com';
                request = mockRequest.createRequest(options);
                expect(request.subdomains).to.be.an('array').to.have.lengthOf(0);
            });
        });
    });

    describe('asyncIterator', () => {
        async function collect(asyncIterable) {
            const chunks = [];
            for await (const chunk of asyncIterable) {
                chunks.push(chunk);
            }
            return chunks;
        }

        it('should iterate when sending data', async () => {
            const request = mockRequest.createRequest();

            const chunksPromise = collect(request);
            request.send('test data');

            const data = Buffer.concat(await chunksPromise).toString();
            expect(data).to.equal('test data');
        });

        it('should iterate synchronous pushes', async () => {
            const request = mockRequest.createRequest();

            const chunksPromise = collect(request);
            request.emit('data', Buffer.from('foo'));
            request.emit('data', Buffer.from('bar'));
            request.emit('data', Buffer.from('baz'));
            request.emit('end');

            const data = Buffer.concat(await chunksPromise).toString();
            expect(data).to.equal('foobarbaz');
        });

        it('should ignore push after end', async () => {
            const request = mockRequest.createRequest();

            const chunksPromise = collect(request);
            request.emit('data', Buffer.from('foo'));
            request.emit('end');
            request.emit('data', Buffer.from('bar'));

            const data = Buffer.concat(await chunksPromise).toString();
            expect(data).to.equal('foo');
        });

        it('should iterate asynchronous pushes', async () => {
            const request = mockRequest.createRequest();

            const chunksPromise = collect(request);
            request.emit('data', Buffer.from('foo'));
            await new Promise((r) => setTimeout(r));
            request.emit('data', Buffer.from('bar'));
            await new Promise((r) => setTimeout(r));
            request.emit('data', Buffer.from('baz'));
            await new Promise((r) => setTimeout(r));
            request.emit('end');

            const data = Buffer.concat(await chunksPromise).toString();
            expect(data).to.equal('foobarbaz');
        });

        it('should support asynchronous pushes while iterating', async () => {
            const request = mockRequest.createRequest();

            const chunksPromise = (async () => {
                const extraPushes = ['3', '2', '1'];
                const chunks = [];
                for await (const chunk of request) {
                    chunks.push(chunk);
                    if (extraPushes.length > 0) {
                        request.emit('data', Buffer.from(extraPushes.pop()));
                        await new Promise((r) => setTimeout(r));
                    }
                }
                return chunks;
            })();

            request.emit('data', Buffer.from('foo'));
            await new Promise((r) => setTimeout(r));
            request.emit('data', Buffer.from('bar'));
            await new Promise((r) => setTimeout(r));
            request.emit('data', Buffer.from('baz'));
            await new Promise((r) => setTimeout(r));
            request.emit('end');

            const data = Buffer.concat(await chunksPromise).toString();
            expect(data).to.equal('foo1bar2baz3');
        });

        it('supports error', async () => {
            const request = mockRequest.createRequest();

            /** @type {AsyncIterator} */
            const iterator = request[Symbol.asyncIterator]();
            const error = new Error('Test error');

            const nextPromise = iterator.next();
            request.emit('error', error);

            try {
                await nextPromise;
                expect.fail();
            } catch (e) {
                expect(e).to.equal(error);
            }
        });

        it('supports throw', async () => {
            const request = mockRequest.createRequest();

            /** @type {AsyncIterator} */
            const iterator = request[Symbol.asyncIterator]();
            const error = new Error('Test error');

            const nextPromise = iterator.next();
            request.emit('data', Buffer.from('foo'));
            await nextPromise;

            try {
                await iterator.throw(error);
                expect.fail();
            } catch (e) {
                expect(e).to.equal(error);
            }
        });

        it('first error wins', async () => {
            const request = mockRequest.createRequest();

            /** @type {AsyncIterator} */
            const iterator = request[Symbol.asyncIterator]();
            const error1 = new Error('Test error 1');
            const error2 = new Error('Test error 2');

            const nextPromise = iterator.next();
            request.emit('error', error1);
            request.emit('error', error2);

            try {
                await nextPromise;
                expect.fail();
            } catch (e) {
                expect(e).to.equal(error1);
            }
        });

        it('supports return', async () => {
            const request = mockRequest.createRequest();

            /** @type {AsyncIterator} */
            const iterator = request[Symbol.asyncIterator]();

            const result = await iterator.return();
            expect(result.done).to.equal(true);
        });

        ['close', 'error'].forEach((event) => {
            it(`discards buffer on ${event}`, async () => {
                const request = mockRequest.createRequest();

                const chunksPromise = (async () => {
                    const chunks = [];
                    try {
                        for await (const data of request) {
                            chunks.push(data);
                        }
                    } catch (e) {
                        // Ignore
                    }
                    return chunks;
                })();

                request.emit('data', Buffer.from('foo'));
                await new Promise((r) => setTimeout(r));
                request.emit('data', Buffer.from('bar'));
                request.emit(event, event === 'error' ? new Error('Test error') : undefined);
                request.emit('data', Buffer.from('baz'));

                const data = Buffer.concat(await chunksPromise).toString();
                expect(data).to.equal('foo');
            });
        });

        it('emits custom event after creation', async () => {
            const request = mockRequest.createRequest();

            request.on('async_iterator', () => {
                request.emit('data', Buffer.from('foo'));
                request.emit('data', Buffer.from('bar'));
                request.emit('data', Buffer.from('baz'));
                request.emit('end');
            });

            const data = Buffer.concat(await collect(request)).toString();
            expect(data).to.equal('foobarbaz');
        });

        if (typeof global.Request === 'function') {
            it('can be fed to a Fetch API Request body', async () => {
                const request = mockRequest.createRequest();

                // eslint-disable-next-line no-undef
                const webRequest = new Request('http://example.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: request,
                    duplex: 'half'
                });

                request.on('async_iterator', () => {
                    request.emit('data', Buffer.from('{ "foo": "b'));
                    request.emit('data', Buffer.from('ar" }'));
                    request.emit('end');
                });

                const webRequestJson = await webRequest.json();
                expect(webRequestJson).to.deep.equal({ foo: 'bar' });
            });
        }
    });
});
