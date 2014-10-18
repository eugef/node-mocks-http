'use strict';

/**
 * File: mockResponse
 *
 *  This file implements node.js's implementation of a 'response' object.
 *  Like all good mocks, the response file that can be called and used in
 *  place of a real HTTP response object.
 *
 * @author Howard Abrams <howard.abrams@gmail.com>
 */

/**
 * Function: createResponse
 *
 *    Creates a new mock 'response' instance. All values are reset to the
 *    defaults.
 *
 * Parameters:
 *
 *   options - An object of named parameters.
 *
 * Options:
 *
 *   encoding - The default encoding for the response
 */

var WritableStream = require('./mockWritableStream');
var EventEmitter = require('./mockEventEmitter');

function createResponse(options) {

    if (!options) {
        options = {};
    }

    var _endCalled = false;
    var _data = '';
    var _headers = {};
    var _encoding = options.encoding;

    var _redirectUrl = '';
    var _renderView = '';
    var _renderData = {};

    var writableStream = options.writableStream ? new options.writableStream() : new WritableStream();
    var eventEmitter = options.eventEmitter ? new options.eventEmitter() : new EventEmitter();

    // create mockResponse

    var mockResponse = {};

    mockResponse.statusCode = -1;
    mockResponse.cookies = {};

    mockResponse.cookie = function(name, value, options) {

        mockResponse.cookies[name] = {
            value: value,
            options: options
        };

    };

    mockResponse.clearCookie = function(name) {
        delete mockResponse.cookies[name];
    };

    mockResponse.status = function(code) {
        mockResponse.statusCode = code;
        return this;
    };

    /**
     * Function: writeHead
     *
     *  The 'writeHead' function from node's HTTP API.
     *
     * Parameters:
     *
     *  statusCode - A number to send as a the HTTP status
     *  headers    - An object of properties that will be used for
     *               the HTTP headers.
     */
    mockResponse.writeHead = function(statusCode, phrase, headers) {

        if (_endCalled) {
            throw 'The end() method has already been called.';
        }

        mockResponse.statusCode = statusCode;

        // Note: Not sure if the headers given in this function
        //       overwrite any headers specified earlier.
        if (headers) {
            _headers = headers;
        } else {
            _headers = phrase;
        }

    };

    /**
     *  The 'send' function from node's HTTP API that returns data
     *  to the client. Can be called multiple times.
     *
     * @param data The data to return. Must be a string.
     */
    mockResponse.send = function(a, b, c) {

        var _formatData = function(a) {

            if (typeof a === 'object') {

                if (a.statusCode) {
                    mockResponse.statusCode = a.statusCode;
                } else if (a.httpCode) {
                    mockResponse.statusCode = a.statusCode;
                }

                if (a.body) {
                    _data = a.body;
                } else {
                    _data = a;
                }

            } else {
                _data += a;
            }

        };

        switch (arguments.length) {

            case 1:

                if (typeof a === 'number') {
                    mockResponse.statusCode = a;
                } else {
                    _formatData(a);
                }

                break;

            case 2:

                if (typeof a === 'number') {
                    _formatData(b);
                    mockResponse.statusCode = a;
                } else if (typeof b === 'number') {
                    _formatData(a);
                    mockResponse.statusCode = b;
                    console.warn('WARNING: Called send() with deprecated parameter order');
                } else {
                    _formatData(a);
                    _encoding = b;
                }

                break;

            case 3:

                _formatData(a);
                _headers = b;
                mockResponse.statusCode = c;
                console.warn('WARNING: Called send() with deprecated three parameters');

                break;

            default:
                break;

        }

        mockResponse.emit('send');
        mockResponse.emit('end');

    };

    /**
     * Function: json
     *
     *   The 'json' function from node's HTTP API that returns JSON
     *   data to the client.
     *
     *  Parameters:
     *
     *   a - Either a statusCode or string containing JSON payload
     *   b - Either a statusCode or string containing JSON payload
     *
     *  If not specified, the statusCode defaults to 200.
     *  Second parameter is optional.
     */
    mockResponse.json = function(a, b) {

        mockResponse.setHeader('Content-Type', 'application/json');
        mockResponse.statusCode = 200;

        if (a) {
            if (typeof a === 'number') {
                mockResponse.statusCode = a;
            } else {
                _data += JSON.stringify(a);
            }
        }
        if (b) {
            if (typeof b === 'number') {
                mockResponse.statusCode = b;
            } else {
                _data += JSON.stringify(b);
            }
        }
    };

    /**
     * Function: write
     *
     *    This function has the same behavior as the 'send' function.
     *
     * Parameters:
     *
     *  data - The data to return. Must be a string. Appended to
     *         previous calls to data.
     *  encoding - Optional encoding value.
     */

    mockResponse.write = function(data, encoding) {

        _data += data;

        if (encoding) {
            _encoding = encoding;
        }

    };

    /**
     *  Function: end
     *
     *  The 'end' function from node's HTTP API that finishes
     *  the connection request. This must be called.
     *
     * Parameters:
     *
     *  data - Optional data to return. Must be a string. Appended
     *         to previous calls to <send>.
     *  encoding - Optional encoding value.
     */
    mockResponse.end = function(data, encoding) {

        _endCalled = true;

        if (data) {
            _data += data;
        }

        if (encoding) {
            _encoding = encoding;
        }

        mockResponse.emit('end');

    };

    /**
     * Function: header
     *
     *   An alias of either getHeader or setHeader depending on
     *   the amount of passed parameters.
     */
    mockResponse.header = function(name, value) {

        if (typeof value !== 'undefined') {
            return mockResponse.setHeader(name, value);
        } else {
            return mockResponse.getHeader(name);
        }

    };

    /**
     * Function: getHeader
     * Function: get
     *
     *   Returns a particular header by name.
     */
    mockResponse.get = mockResponse.getHeader = function(name) {
        return _headers[name];
    };

    /**
     * Function: setHeader
     * Function: set
     *
     *   Set a particular header by name.
     */
    mockResponse.set = mockResponse.setHeader = function(name, value) {
        _headers[name] = value;
        return value;
    };

    /**
     * Function: removeHeader
     *
     *   Removes an HTTP header by name.
     */
    mockResponse.removeHeader = function(name) {
        delete _headers[name];
    };

    /**
     * Function: setEncoding
     *
     *    Sets the encoding for the data. Generally 'utf8'.
     *
     * Parameters:
     *
     *   encoding - The string representing the encoding value.
     */
    mockResponse.setEncoding = function(encoding) {
        _encoding = encoding;
    };

    /**
     * Function: redirect
     *
     *     Redirect to a url with response code
     */
    mockResponse.redirect = function(a, b) {

        switch (arguments.length) {

            case 1:

                _redirectUrl = a;
                break;

            case 2:

                if (typeof a === 'number') {
                    mockResponse.statusCode = a;
                    _redirectUrl = b;
                }

                break;

            default:
                break;

        }

    };

    /**
     * Function: render
     *
     *     Render a view with a callback responding with the
     *     rendered string.
     */
    mockResponse.render = function(a, b, c) {

        _renderView = a;

        switch (arguments.length) {

            case 2:
                break;

            case 3:
                _renderData = b;
                break;

            default:
                break;

        }

        mockResponse.emit('render');
        mockResponse.emit('end');

    };

    mockResponse.writable = function() {
        return writableStream.writable.apply(this, arguments);
    };

    // mockResponse.end = function(){
    //  return writableStream.end.apply(this, arguments);
    // };

    mockResponse.destroy = function() {
        return writableStream.destroy.apply(this, arguments);
    };

    mockResponse.destroySoon = function() {
        return writableStream.destroySoon.apply(this, arguments);
    };

    mockResponse.addListener = function(event, listener) {
        return eventEmitter.addListener.apply(this, arguments);
    };

    mockResponse.on = function(event, listener) {
        return eventEmitter.on.apply(this, arguments);
    };

    mockResponse.once = function(event, listener) {
        return eventEmitter.once.apply(this, arguments);
    };

    mockResponse.removeListener = function(event, listener) {
        return eventEmitter.removeListener.apply(this, arguments);
    };

    mockResponse.removeAllListeners = function(event) {
        return eventEmitter.removeAllListeners.apply(this, arguments);
    };

    mockResponse.setMaxListeners = function(n) {
        return eventEmitter.setMaxListeners.apply(this, arguments);
    };

    mockResponse.listeners = function(event) {
        return eventEmitter.listeners.apply(this, arguments);
    };

    mockResponse.emit = function(event) {
        return eventEmitter.emit.apply(this, arguments);
    };

    //This mock object stores some state as well
    //as some test-analysis functions:

    /**
     * Function: _isEndCalled
     *
     *  Since the <end> function must be called, this function
     *  returns true if it has been called. False otherwise.
     */
    mockResponse._isEndCalled = function() {
        return _endCalled;
    };

    /**
     * Function: _getHeaders
     *
     *  Returns all the headers that were set. This may be an
     *  empty object, but probably will have "Content-Type" set.
     */
    mockResponse._getHeaders = function() {
        return _headers;
    };

    /**
     * Function: _getData
     *
     *  The data sent to the user.
     */
    mockResponse._getData = function() {
        return _data;
    };

    /**
     * Function: _getStatusCode
     *
     *  The status code that was sent to the user.
     */
    mockResponse._getStatusCode = function() {
        return mockResponse.statusCode;
    };

    /**
     * Function: _isJSON
     *
     *  Returns true if the data sent was defined as JSON.
     *  It doesn't validate the data that was sent.
     */
    mockResponse._isJSON = function() {
        return (_headers['Content-Type'] === 'application/json');
    };

    /**
     * Function: _isUTF8
     *
     *    If the encoding was set, and it was set to UTF-8, then
     *    this function return true. False otherwise.
     *
     * Returns:
     *
     *   False if the encoding wasn't set and wasn't set to "utf8".
     */
    mockResponse._isUTF8 = function() {

        if (!_encoding) {
            return false;
        }

        return (_encoding === 'utf8');

    };

    /**
     * Function: _isDataLengthValid
     *
     *    If the Content-Length header was set, this will only
     *    return true if the length is actually the length of the
     *    data that was set.
     *
     * Returns:
     *
     *   True if the "Content-Length" header was not
     *   set. Otherwise, it compares it.
     */
    mockResponse._isDataLengthValid = function() {

        if (_headers['Content-Length']) {
            return (_headers['Content-Length'].toString() === _data.length.toString());
        }

        return true;

    };

    /**
     * Function: _getRedirectUrl
     *
     *     Return redirect url of redirect method
     *
     * Returns:
     *
     *     Redirect url
     */
    mockResponse._getRedirectUrl = function() {
        return _redirectUrl;
    };

    /**
     * Function: _getRenderView
     *
     *     Return render view of render method
     *
     * Returns:
     *
     *     render view
     */
    mockResponse._getRenderView = function() {
        return _renderView;
    };

    /**
     * Function: _getRenderData
     *
     *     Return render data of render method
     *
     * Returns:
     *
     *     render data
     */
    mockResponse._getRenderData = function() {
        return _renderData;
    };

    return mockResponse;

}

module.exports.createResponse = createResponse;
