/**
 * Test: headers.spec.js
 *
 * This file tests the Headers implementation which provides both
 * Express.js style header access and Web API Headers interface functionality.
 */
const { expect } = require('chai');
const { createHeaders } = require('../../lib/headers');

describe('Headers', () => {
    describe('Headers basic HTTP', () => {
        it('should create an empty headers object', () => {
            const headers = createHeaders();
            expect(headers).to.be.an('object');
            expect(Object.keys(headers).length).to.equal(0);
        });

        it('should initialize with provided headers', () => {
            const initialHeaders = { 'content-type': 'application/json' };
            const headers = createHeaders(initialHeaders);

            expect(headers['content-type']).to.equal('application/json');
        });
    });

    describe('Headers Web API Methods', () => {
        describe('#get()', () => {
            it('should get a header value', () => {
                const headers = createHeaders({ 'content-type': 'application/json' });

                expect(headers.get('content-type')).to.equal('application/json');
                expect(headers.get('Content-Type')).to.equal('application/json');
            });

            it('should return undefined for non-existent headers', () => {
                const headers = createHeaders();

                expect(headers.get('content-type')).to.be.undefined;
            });

            it('should handle the referer/referrer special case', () => {
                const headersWithReferer = createHeaders({ referer: 'http://example.com' });
                expect(headersWithReferer.get('referrer')).to.equal('http://example.com');

                const headersWithReferrer = createHeaders({ referrer: 'http://example.com' });
                expect(headersWithReferrer.get('referer')).to.equal('http://example.com');
            });
        });

        describe('#getAll()', () => {
            it('should get all values for a header as an array', () => {
                const headers = createHeaders({ 'set-cookie': ['cookie1=value1', 'cookie2=value2'] });

                expect(headers.getAll('set-cookie')).to.deep.equal(['cookie1=value1', 'cookie2=value2']);
            });

            it('should return a single value as an array', () => {
                const headers = createHeaders({ 'content-type': 'application/json' });

                expect(headers.getAll('content-type')).to.deep.equal(['application/json']);
            });

            it('should return an empty array for non-existent headers', () => {
                const headers = createHeaders();

                expect(headers.getAll('content-type')).to.deep.equal([]);
            });
        });

        describe('#has()', () => {
            it('should check if a header exists', () => {
                const headers = createHeaders({ 'content-type': 'application/json' });

                expect(headers.has('content-type')).to.be.true;
                expect(headers.has('Content-Type')).to.be.true;
            });

            it('should return false for non-existent headers', () => {
                const headers = createHeaders();

                expect(headers.has('content-type')).to.be.false;
            });
        });

        describe('#set()', () => {
            it('should set a header value', () => {
                const headers = createHeaders();

                headers.set('content-type', 'application/json');
                expect(headers['content-type']).to.equal('application/json');
            });

            it('should overwrite existing headers', () => {
                const headers = createHeaders({ 'content-type': 'text/html' });

                headers.set('Content-Type', 'application/json');
                expect(headers['content-type']).to.equal('application/json');
            });
        });

        describe('#append()', () => {
            it('should append a value to a non-existent header', () => {
                const headers = createHeaders();

                headers.append('content-type', 'application/json');
                expect(headers['content-type']).to.equal('application/json');
            });

            it('should convert a single value to an array when appending', () => {
                const headers = createHeaders({ accept: 'text/html' });

                headers.append('accept', 'application/json');
                expect(headers.accept).to.deep.equal(['text/html', 'application/json']);
            });

            it('should append to an existing array of values', () => {
                const headers = createHeaders({ 'set-cookie': ['cookie1=value1'] });

                headers.append('set-cookie', 'cookie2=value2');
                expect(headers['set-cookie']).to.deep.equal(['cookie1=value1', 'cookie2=value2']);
            });
        });

        describe('#delete()', () => {
            it('should delete a header', () => {
                const headers = createHeaders({ 'content-type': 'application/json' });

                headers.delete('content-type');
                expect(headers['content-type']).to.be.undefined;
                expect('content-type' in headers).to.be.false;
            });

            it('should handle case-insensitive deletion', () => {
                const headers = createHeaders({ 'content-type': 'application/json' });

                headers.delete('Content-Type');
                expect('content-type' in headers).to.be.false;
            });
        });

        describe('#forEach()', () => {
            it('should iterate over all headers', () => {
                const headers = createHeaders({
                    'content-type': 'application/json',
                    accept: 'text/html',
                    'x-custom': 'custom-value'
                });

                const result = {};
                headers.forEach((value, key) => {
                    result[key] = value;
                });

                expect(result).to.deep.equal({
                    'content-type': 'application/json',
                    accept: 'text/html',
                    'x-custom': 'custom-value'
                });
            });

            it('should respect thisArg parameter', () => {
                const headers = createHeaders({ 'content-type': 'application/json' });
                const context = { value: 'context' };

                headers.forEach(function iterator() {
                    expect(this).to.equal(context);
                }, context);
            });
        });
    });

    describe('Iterable Interface', () => {
        it('should implement entries() iterator', () => {
            const headers = createHeaders({
                'content-type': 'application/json',
                accept: 'text/html'
            });

            const entries = Array.from(headers.entries());
            expect(entries).to.deep.include(['content-type', 'application/json']);
            expect(entries).to.deep.include(['accept', 'text/html']);
        });

        it('should implement keys() iterator', () => {
            const headers = createHeaders({
                'content-type': 'application/json',
                accept: 'text/html'
            });

            const keys = Array.from(headers.keys());
            expect(keys).to.include('content-type');
            expect(keys).to.include('accept');
        });

        it('should implement values() iterator', () => {
            const headers = createHeaders({
                'content-type': 'application/json',
                accept: 'text/html'
            });

            const values = Array.from(headers.values());
            expect(values).to.include('application/json');
            expect(values).to.include('text/html');
        });

        it('should be iterable with Symbol.iterator', () => {
            const headers = createHeaders({
                'content-type': 'application/json',
                accept: 'text/html'
            });

            const entries = Array.from(headers);
            expect(entries).to.deep.include(['content-type', 'application/json']);
            expect(entries).to.deep.include(['accept', 'text/html']);
        });
    });

    describe('Property Operations', () => {
        it('should delete properties in a case-insensitive manner', () => {
            const headers = createHeaders({ 'Content-Type': 'application/json' });

            delete headers['content-type'];
            expect('Content-Type' in headers).to.be.false;
        });

        it('should list all header keys with Object.keys', () => {
            const headers = createHeaders({
                'content-type': 'application/json',
                accept: 'text/html'
            });

            const keys = Object.keys(headers);
            expect(keys).to.include('content-type');
            expect(keys).to.include('accept');
            expect(keys.length).to.equal(2);
        });
    });
});
