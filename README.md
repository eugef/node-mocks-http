node-mocks-http
===============

Mock 'http' objects for testing Express routing functions, but could be used
for testing any [Node.js](http://www.nodejs.org) web server applications that
have code that requires mockups of the `request` and `response` objects.

Example
-------

Suppose we have the following magical Express incantation:

    app.get('/user/:id', mod.aroute);

And we have ourselves a function to answer that call:

    var aroute = function( request, response ) { ... };

You can easily test that function with some code like this:

    exports['aroute - Simple testing'] = function(test) {
        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/user/42',
            params: { id: 42 }
        });
        var response = httpMocks.createResponse();

        aroute(request, response);

        var data = JSON.parse( response._getData() );
        test.equal("Bob Dog", data.name);
        test.equal(42, data.age);
        test.equal("bob@dog.com", data.email);

        test.equal(200, response.statusCode );
        test.ok( response._isEndCalled());
        test.ok( response._isJSON());
        test.ok( response._isUTF8());
        test.done();
    };

Installation
------------

This project is available as a NPM package.

    npm install node-mocks-http

After this, just include the following in your test files:

    var httpMocks = require('../lib/http-mock');

Design Decisions
----------------

We wanted some simple mocks without any larger framework.

We also wanted the mocks to simply act like the original, but allow setting values
before calling and inspecting afterwards.

We are looking for more volunteers to value to this project, including the
creation of more objects from the [HTTP module](http://nodejs.org/docs/latest/api/http.html).

For Developers
=========

Obviously this project doesn't address all features that must be
mocked, but it is a start. Feel free to send pull requests, and I
promise to be timely in merging them.

After making any changes, please verify your work:

  * npm install -g jshint
  * npm install
  * ./run-tests

Release Notes
=============

Most releases fixes bugs with our mocks or add features similar to the
actual `Request` and `Response` objects offered by Node.js and extended
by Express.

v 1.0.3
-------

  * Merged changes by [invernizzie](https://github.com/invernizzie):
    to address [#11](https://github.com/howardabrams/node-mocks-http/pull/11)

  * Merged changes by [ericchaves](https://github.com/ericchaves):
    > I extended your library a little but so it could also handle
    > some structured responses. By doing so res.send now evaluate the
    > data passed and search for either a statusCode or httpCode to be
    > used, and also for a body to send as _data.
    >
    > It still working as expected (at least tests passed) for regular
    > HTTP responses.
    >
    > Although I did it with node-restify in mind, it should work well
    > for all other libs.

v 1.0.2
-------

  * Added a `.json()` method to the response. (Thanks, diachedelic)
  * Cleaned up all source files so ./run-tests passes.
  * Cleaned up jshint issues.

v 1.0.1
-------

  * Add support for response redirect and render

v 0.0.9
-------

  * Add support for response cookies

v 0.0.8
-------

  * Add support for request headers
  * Fix wrong function name of set cookies

v 0.0.7
-------

  * Add support for request cookies

v 0.0.6
-------

  * Add support for request files

v 0.0.5
-------

  * Fixed a bug where `response.send()` can take two parameters, the
    status code and the data to send.

v 0.0.4
-------

  * Added a `request.session` that can be set during construction (or via
    calling the `_setSessionVariable()` method, and read as an object.

v 0.0.3
-------

  * Added a `request.query` that can be set during construction and read
    as an object.

v 0.0.2
-------

  * Code refactoring of the `Response` mock.

v 0.0.1
-------

  * Initial code banged out one late night...
