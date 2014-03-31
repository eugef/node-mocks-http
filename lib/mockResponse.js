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

var WritableStream = require('./mockWritableStream'),
    EventEmitter = require('./mockEventEmitter');

exports.createResponse = function (options) {
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

  var writableStream = options.writableStream ?
    new options.writableStream() :
    new WritableStream();
  var eventEmitter = options.eventEmitter ?
    new options.eventEmitter() :
    new EventEmitter();

  return {
    statusCode: -1,

    cookies: {},

    cookie: function (name, value, options) {
      this.cookies[name] = {
        value: value,
        options: options
      };
    },

    clearCookie: function (name) {
      delete this.cookies[name];
    },

    status: function (code) {
      this.statusCode = code;
      return this;
    },

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
    writeHead: function (statusCode, phrase, headers) {
      if (_endCalled) {
        throw 'The end() method has already been called.';
      }

      this.statusCode = statusCode;

      // Note: Not sure if the headers given in this function
      //       overwrite any headers specified earlier.
      if (headers) {
        _headers = headers;
      } else {
        _headers = phrase;
      }
    },

    /**
     *  The 'send' function from node's HTTP API that returns data
     *  to the client. Can be called multiple times.
     *
     * @param data The data to return. Must be a string.
     */
    send: function (a, b, c) {
      var _self = this;
      var _formatData = function(a) {
        if (typeof a === 'object') {
          if (a.statusCode) {
            _self.statusCode = a.statusCode;
          }
          else if (a.httpCode) {
            _self.statusCode = a.statusCode;
          }
          if (a.body) {
            _data = a.body;
          }
          else {
            _data = a;
          }
        } else {
          _data += a;
        }
      };

      switch (arguments.length) {
      case 1:
        if (typeof a === 'number') {
          this.statusCode = a;
        } else {
          _formatData(a);
        }
        break;

      case 2:
        if (typeof a === 'number') {
          _formatData(b);
          this.statusCode = a;
        } else if (typeof b === 'number') {
          _formatData(a);
          this.statusCode = b;
          console.warn('WARNING: Called send() with deprecated parameter order');
        } else {
          _formatData(a);
          _encoding = b;
        }
        break;

      case 3:
        _formatData(a);
        _headers = b;
        this.statusCode = c;
        console.warn('WARNING: Called send() with deprecated three parameters');
        break;

      default:
        break;
      }

      this.emit('send');
      this.emit('end');
    },

    /**
     *  The 'json' function from node's HTTP API that returns JSON data
     *  to the client.  Should not be called multiple times.
     */
    json: function (a, b) {
      this.setHeader('Content-Type', 'application/json');

      switch (arguments.length) {
      case 1:
        if (typeof a === 'number') {
          this.statusCode = a;
        } else {
          _data += JSON.stringify(a);
          this.statusCode = 200;
        }
        break;

      case 2:
        this.statusCode = a;
        _data += JSON.stringify(b);

        break;

      default:
        break;
      }
    },

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

    write: function (data, encoding) {
      _data += data;
      if (encoding) {
        _encoding = encoding;
      }
    },

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
    end: function (data, encoding) {
      _endCalled = true;
      if (data) {
        _data += data;
      }
      if (encoding) {
        _encoding = encoding;
      }
      this.emit('end');
    },


    /**
     * Function: getHeader
     *
     *   Returns a particular header by name.
     */
    getHeader: function (name) {
      return _headers[name];
    },

    /**
     * Function: setHeader
     *
     *   Set a particular header by name.
     */
    setHeader: function (name, value) {
      _headers[name] = value;
      return value;
    },

    /**
     * Function: removeHeader
     *
     *   Removes an HTTP header by name.
     */
    removeHeader: function (name) {
      delete _headers[name];
    },

    /**
     * Function: setEncoding
     *
     *    Sets the encoding for the data. Generally 'utf8'.
     *
     * Parameters:
     *
     *   encoding - The string representing the encoding value.
     */
    setEncoding: function (encoding) {
      _encoding = encoding;
    },

    /**
     * Function: redirect
     *
     *     Redirect to a url with response code
     */
    redirect: function (a, b) {
      switch (arguments.length) {
      case 1:
        _redirectUrl = a;
        break;

      case 2:
        if (typeof a === 'number') {
          this.statusCode = a;
          _redirectUrl = b;
        }
        break;

      default:
        break;
      }
    },

    /**
     * Function: render
     *
     *     Render a view with a callback responding with the
     *     rendered string.
     */
    render: function (a, b, c) {
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

      this.emit('render');
      this.emit('end');
    },

    writable: function () {
      return writableStream.writable.apply(this, arguments);
    },
    // end: function(){
    // 	return writableStream.end.apply(this, arguments);
    // },
    destroy: function () {
      return writableStream.destroy.apply(this, arguments);
    },
    destroySoon: function () {
      return writableStream.destroySoon.apply(this, arguments);
    },
    addListener: function (event, listener) {
      return eventEmitter.addListener.apply(this, arguments);
    },
    on: function (event, listener) {
      return eventEmitter.on.apply(this, arguments);
    },
    once: function (event, listener) {
      return eventEmitter.once.apply(this, arguments);
    },
    removeListener: function (event, listener) {
      return eventEmitter.removeListener.apply(this, arguments);
    },
    removeAllListeners: function (event) {
      return eventEmitter.removeAllListeners.apply(this, arguments);
    },
    setMaxListeners: function (n) {
      return eventEmitter.setMaxListeners.apply(this, arguments);
    },
    listeners: function (event) {
      return eventEmitter.listeners.apply(this, arguments);
    },
    emit: function (event) {
      return eventEmitter.emit.apply(this, arguments);
    },
    //This mock object stores some state as well
    //as some test-analysis functions:

    /**
     * Function: _isEndCalled
     *
     *  Since the <end> function must be called, this function
     *  returns true if it has been called. False otherwise.
     */
    _isEndCalled: function () {
      return _endCalled;
    },


    /**
     * Function: _getHeaders
     *
     *  Returns all the headers that were set. This may be an
     *  empty object, but probably will have "Content-Type" set.
     */
    _getHeaders: function () {
      return _headers;
    },

    /**
     * Function: _getData
     *
     *  The data sent to the user.
     */
    _getData: function () {
      return _data;
    },

    /**
     * Function: _getStatusCode
     *
     *  The status code that was sent to the user.
     */
    _getStatusCode: function () {
      return this.statusCode;
    },

    /**
     * Function: _isJSON
     *
     *  Returns true if the data sent was defined as JSON.
     *  It doesn't validate the data that was sent.
     */
    _isJSON: function () {
      return (_headers['Content-Type'] === 'application/json');
    },

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
    _isUTF8: function () {
      if (!_encoding) {
        return false;
      }
      return (_encoding === 'utf8');
    },

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
    _isDataLengthValid: function () {
      if (_headers['Content-Length']) {
        return (_headers['Content-Length'].toString() === _data.length.toString());
      }
      return true;
    },

    /**
     * Function: _getRedirectUrl
     *
     *     Return redirect url of redirect method
     *
     * Returns:
     *
     *     Redirect url
     */
    _getRedirectUrl: function () {
      return _redirectUrl;
    },

    /**
     * Function: _getRenderView
     *
     *     Return render view of render method
     *
     * Returns:
     *
     *     render view
     */
    _getRenderView: function () {
      return _renderView;
    },

    /**
     * Function: _getRenderData
     *
     *     Return render data of render method
     *
     * Returns:
     *
     *     render data
     */
    _getRenderData: function () {
      return _renderData;
    }
  };
};
