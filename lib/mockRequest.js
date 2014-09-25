'use strict';

/**
 * File: mockRequest
 *
 * This file implements node.js's implementation of a 'request' object.
 * This is actually closer to what Express offers the user, in that the
 * body is really a parsed object of values.
 *
 * @author Howard Abrams <howard.abrams@gmail.com>
 */

/**
 * Function: createRequest
 *
 *    Creates a new mock 'request' instance. All values are reset to the
 *    defaults.
 *
 * Parameters:
 *
 *   options - An object of named parameters.
 *
 * Options:
 *
 *   method - The method value, see <mockRequest._setMethod>
 *   url    - The url value, see <mockRequest._setURL>
 *   params - The parameters, see <mockRequest._setParam>
 *   body   - The body values, , see <mockRequest._setBody>
 */

function createRequest(options) {

    if (!options) {
        options = {};
    }

    // creat mockRequest

    var mockRequest = {};

    mockRequest.method = (options.method) ? options.method : 'GET';
    mockRequest.url = (options.url) ? options.url : '';
    mockRequest.params = (options.params) ? options.params : {};
    mockRequest.session = (options.session) ? options.session : {};
    mockRequest.cookies = (options.cookies) ? options.cookies : {};
    mockRequest.headers = (options.headers) ? options.headers : {};
    mockRequest.body = (options.body) ? options.body : {};
    mockRequest.query = (options.query) ? options.query : {};
    mockRequest.files = (options.files) ? options.files : {};

    /**
     * Function: header
     *
     *   Returns a particular header by name.
     */
    mockRequest.header = function(name) {
        return mockRequest.headers[name];
    };

    /**
     * Function: get
     *
     *   An copy of header.
     */
    mockRequest.get = function(name) {
        return mockRequest.headers[name];
    };

    /**
     * Function: _setParameter
     *
     *    Set parameters that the client can then get using the 'params'
     *    key.
     *
     * Parameters:
     *
     *   key - The key. For instance, 'bob' would be accessed: request.params.bob
     *   value - The value to return when accessed.
     */
    mockRequest._setParameter = function(key, value) {
        mockRequest.params[key] = value;
    };

    /**
     * Sets a variable that is stored in the session.
     *
     * @param variable The variable to store in the session
     * @param value    The value associated with the variable
     */
    mockRequest._setSessionVariable = function(variable, value) {
        mockRequest.session[variable] = value;
    };

    /**
     * Sets a variable that is stored in the cookies.
     *
     * @param variable The variable to store in the cookies
     * @param value    The value associated with the variable
     */
    mockRequest._setCookiesVariable = function(variable, value) {
        mockRequest.cookies[variable] = value;
    };

    /**
     * Sets a variable that is stored in the headers.
     *
     * @param variable The variable to store in the headers
     * @param value    The value associated with the variable
     */
    mockRequest._setHeadersVariable = function(variable, value) {
        mockRequest.headers[variable] = value;
    };

    /**
     * Sets a variable that is stored in the files.
     *
     * @param variable The variable to store in the files
     * @param value    The value associated with the variable
     */
    mockRequest._setFilesVariable = function(variable, value) {
        mockRequest.files[variable] = value;
    };

    /**
     * Function: _setMethod
     *
     *    Sets the HTTP method that the client gets when the called the 'method'
     *    property. This defaults to 'GET' if it is not set.
     *
     * Parameters:
     *
     *   method - The HTTP method, e.g. GET, POST, PUT, DELETE, etc.
     *
     * Note: We don't validate the string. We just return it.
     */
    mockRequest._setMethod = function(method) {
        mockRequest.method = method;
    };

    /**
     * Function: _setURL
     *
     *    Sets the URL value that the client gets when the called the 'url'
     *    property.
     *
     * Parameters:
     *
     *   url - The request path, e.g. /my-route/452
     *
     * Note: We don't validate the string. We just return it. Typically, these
     * do not include hostname, port or that part of the URL.
     */
    mockRequest._setURL = function(url) {
        mockRequest.url = url;
    };

    /**
     * Function: _setBody
     *
     *    Sets the body that the client gets when the called the 'body'
     *    parameter. This defaults to 'GET' if it is not set.
     *
     * Parameters:
     *
     *   body - An object representing the body.
     *
     * If you expect the 'body' to come from a form, this typically means that
     * it would be a flat object of properties and values, as in:
     *
     * > {  name: 'Howard Abrams',
     * >    age: 522
     * > }
     *
     * If the client is expecting a JSON object through a REST interface, then
     * this object could be anything.
     */
    mockRequest._setBody = function(body) {
        mockRequest.body = body;
    };

    /**
     * Function: _addBody
     *
     *    Adds another body parameter the client gets when calling the 'body'
     *    parameter with another property value, e.g. the name of a form element
     *    that was passed in.
     *
     * Parameters:
     *
     *   key - The key. For instance, 'bob' would be accessed: request.params.bob
     *   value - The value to return when accessed.
     */
    mockRequest._addBody = function(key, value) {
        mockRequest.body[key] = value;
    };

    return mockRequest;

}

module.exports.createRequest = createRequest;