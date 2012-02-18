/**
 * File: mockResponse
 * 
 *  This file implements node.js's implementation of a 'response' object.
 *  Like all good mocks, the response file that can be called and used in 
 *  place of a real HTTP response object.
 *  
 * @author Howard Abrams <howard.abrams@gmail.com>
 */

Provider = function(){};

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
Provider.prototype.writeHead = function( statusCode, phrase, headers ) {
    if (this._endCalled) {
        throw "The end() method has already been called.";
    }
    
    this.statusCode = statusCode;
    
    // Note: Not sure if the headers given in this function overwrite
    //       any headers specified earlier.
    if (headers) {
        this._reasonPhrase = phrase;
        this._headers = headers;
    }
    else {
        this._headers = phrase;
    }
};

/**
 *  Function: send
 *
 *  The 'send' function from node's HTTP API that returns data
 *  to the client. Can be called multiple times.
 * 
 * Parameters:
 *
 *  data - The data to return. Must be a string. Appended to 
 *         previous calls to data.
 *  encoding - Optional encoding value.
 */
Provider.prototype.send = function( data, encoding ) {
    this._data += data;
    if (encoding) {
        this._encoding = encoding;
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

Provider.prototype.write = function( data, encoding ) {
    this.send(data, encoding);
};

/**
 *  Function: end
 *
 *  The 'end' function from node's HTTP API that finishes
 *  the connection request. This must be called.
 * 
 * Parameters:
 *
 *  data - Optional data to return. Must be a string. Appended to 
 *         previous calls to <send>.
 *  encoding - Optional encoding value.
 */
Provider.prototype.end = function( data, encoding ) {
    this._endCalled = true;
    if (data) {
        this._data += data;
    }
    if (encoding) {
        this._encoding = encoding;
    }
};


/**
 * Function: getHeader
 *
 *   Returns a particular header by name.
 */
Provider.prototype.getHeader = function(name) {
    return this._headers[name];
};

/**
 * Function: setHeader
 *
 *   Set a particular header by name.
 */
Provider.prototype.setHeader = function(name, value) {
    return this._headers[name] = value;
};

/**
 * Function: removeHeader
 *
 *   Removes an HTTP header by name.
 */
Provider.prototype.removeHeader = function(name) {
    delete this._headers[name];
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
Provider.prototype.setEncoding = function(encoding) {
    this._encoding = encoding;
};


//This mock object stores some state as well
//as some test-analysis functions:

/**
* Function: _isEndCalled
*
*  Since the <end> function must be called, this function
*  returns true if it has been called. False otherwise.
*/
Provider.prototype._isEndCalled = function() {
 return this._endCalled;
};


/**
 * Function: _getHeaders
 *
 *  Returns all the headers that were set. This may be an
 *  empty object, but probably will have "Content-Type" set.
 */
Provider.prototype._getHeaders = function() {
    return this._headers;
};



/**
 * Function: _getData
 *
 *  The data sent to the user.
 */
Provider.prototype._getData = function() {
    return this._data;
};

/**
 * Function: _getStatusCode
 *
 *  The status code that was sent to the user.
 */
Provider.prototype._getStatusCode = function() {
    return this.statusCode;
};

/**
 * Function: _isJSON
 *
 *  Returns true if the data sent was defined as JSON.
 *  It doesn't validate the data that was sent.
 */
Provider.prototype._isJSON = function() {
    return (this._headers["Content-Type"] == "application/json");
};

/**
 * Function: _isUTF8
 *
 *    If the encoding was set, and it was set to UTF-8, then this function
 *    return true. False otherwise.
 *    
 * Returns:
 *
 *   False if the encoding wasn't set and wasn't set to "utf8".
 */
Provider.prototype._isUTF8 = function() {
    if ( !this._encoding ) {
        return false;
    }
    return ( this._encoding === "utf8" );
};

/**
 * Function: _isDataLengthValid
 *
 *    If the Content-Length header was set, this will only return true if
 *    the length is actually the length of the data that was set.
 *
 * Returns:
 *
 *   True if the "Content-Length" header was not set. Otherwise, it compares
 *   it.
 */
Provider.prototype._isDataLengthValid = function() {
    if (this._headers["Content-Length"]) {
        return (this._headers["Content-Length"] == this._data.length);
    }
    return true;
};

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
 */

exports.createResponse = function(options) {
    var p = new Provider();
    
    p._endCalled = false;
    p._data = "";
    p.statusCode = -1;
    p._headers = {};

    return p;
};
