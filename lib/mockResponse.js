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

exports.createResponse = function(options) {
    if (!options) {
        options = {};
    }

    var _endCalled = false;
    var _data      = "";
    var _headers   = {};
    var _encoding  = options.encoding;

    return {
        statusCode: -1,

        status: function(code) {
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
        writeHead: function( statusCode, phrase, headers ) {
            if (_endCalled) {
                throw "The end() method has already been called.";
            }
            
            this.statusCode = statusCode;
            
            // Note: Not sure if the headers given in this function
            //       overwrite any headers specified earlier.
            if (headers) {
                _reasonPhrase = phrase;
                _headers = headers;
            }
            else {
                _headers = phrase;
            }
        },
        
        /**
         *  The 'send' function from node's HTTP API that returns data
         *  to the client. Can be called multiple times.
         * 
         * @param data The data to return. Must be a string.
         */
        send: function( a, b, c ) {
            switch (arguments.length) {
                case 1:
                    _data += a;
                    break;
                    
                case 2:
                    if (typeof a == 'number') {
                        this.statusCode = a;                        
                        _data += b;
                    }
                    else if (typeof b == 'number') {
                        _data += a;
                        this.statusCode = b;
                        console.warn("WARNING: Called 'send' with deprecated parameter order"); 
                    }
                    else {
                        _data += a;
                        _encoding = b;
                    }
                    break;
                    
                case 3:
                    _data += a;
                    _headers = b;
                    this.statusCode = c;
                    console.warn("WARNING: Called 'send' with deprecated three parameters"); 
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
        
        write: function( data, encoding ) {
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
        end: function( data, encoding ) {
            _endCalled = true;
            if (data) {
                _data += data;
            }
            if (encoding) {
                _encoding = encoding;
            }
        },


        /**
         * Function: getHeader
         *
         *   Returns a particular header by name.
         */
        getHeader: function(name) {
            return _headers[name];
        },

        /**
         * Function: setHeader
         *
         *   Set a particular header by name.
         */
        setHeader: function(name, value) {
            return _headers[name] = value;
        },

        /**
         * Function: removeHeader
         *
         *   Removes an HTTP header by name.
         */
        removeHeader: function(name) {
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
        setEncoding: function(encoding) {
            _encoding = encoding;
        },
        
        
        //This mock object stores some state as well
        //as some test-analysis functions:
        
        /**
         * Function: _isEndCalled
         *
         *  Since the <end> function must be called, this function
         *  returns true if it has been called. False otherwise.
         */
        _isEndCalled: function() {
            return _endCalled;
        },

        
        /**
         * Function: _getHeaders
         *
         *  Returns all the headers that were set. This may be an
         *  empty object, but probably will have "Content-Type" set.
         */
        _getHeaders: function() {
            return _headers;
        },



        /**
         * Function: _getData
         *
         *  The data sent to the user.
         */
        _getData: function() {
            return _data;
        },

        /**
         * Function: _getStatusCode
         *
         *  The status code that was sent to the user.
         */
        _getStatusCode: function() {
            return this.statusCode;
        },

        /**
         * Function: _isJSON
         *
         *  Returns true if the data sent was defined as JSON.
         *  It doesn't validate the data that was sent.
         */
        _isJSON: function() {
            return (_headers["Content-Type"] == "application/json");
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
        _isUTF8: function() {
            if ( !_encoding ) {
                return false;
            }
            return ( _encoding === "utf8" );
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
        _isDataLengthValid: function() {
            if (_headers["Content-Length"]) {
                return (_headers["Content-Length"] == _data.length);
            }
            return true;
        }
    };
};