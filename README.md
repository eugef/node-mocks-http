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
  