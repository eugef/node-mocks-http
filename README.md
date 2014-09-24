node-mocks-http
---

Mock 'http' objects for testing Express routing functions, but could be used
for testing any [Node.js](http://www.nodejs.org) web server applications that
have code that requires mockups of the `request` and `response` objects.

Installation
---

This project is available as a [NPM package](https://www.npmjs.org/package/node-mocks-http).

```bash
$ npm install node-mocks-http
```

After installing the package include the following in your test files:

```js
var httpMocks = require('node-mocks-http');
```

Usage
---

Suppose you have the following Express route:

```js
app.get('/user/:id', routeHandler);
```

And you have created a function to handle that route's call:

```js
var routeHandler = function( request, response ) { ... };
```

You can easily test the `routeHandler` function with some code like this using the testing framework of your choice:

```js
exports['routeHandler - Simple testing'] = function(test) {

    var request  = httpMocks.createRequest({
        method: 'GET',
        url: '/user/42',
        params: {
          id: 42
        }
    });

    var response = httpMocks.createResponse();

    routeHandler(request, response);

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
```

Design Decisions
---

We wanted some simple mocks without a large framework.

We also wanted the mocks to act like the original framework being mocked,
but allow for setting of values before calling and inspecting of values after calling.

For Developers
---

We are looking for more volunteers to bring value to this project, including the
creation of more objects from the [HTTP module](http://nodejs.org/docs/latest/api/http.html).

This project doesn't address all features that must be
mocked, but it is a good start. Feel free to send pull requests,
and a member of the team will be timely in merging them.

After making any changes, please verify your work:

```bash
npm install -g jshint
npm install
./run-tests
```

Release Notes
---

Most releases fix bugs with our mocks or add features similar to the
actual `Request` and `Response` objects offered by Node.js and extended
by Express.

v 1.2.0
---

  * Adds a `.header` and `.get` method to the request.

v 1.1.0
---

  * Adds a `.header`, `.set`, and `.get` method to the response.

v 1.0.4
---

  * Adds the MIT license

v 1.0.3
---

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
---

  * Adds a `.json()` method to the response. (Thanks, diachedelic)
  * Cleaned up all source files so ./run-tests passes.
  * Cleaned up jshint issues.

v 1.0.1
---

  * Adds support for response redirect and render

v 0.0.9
---

  * Adds support for response cookies

v 0.0.8
---

  * Adds support for request headers
  * Fix wrong function name of set cookies

v 0.0.7
---

  * Adds support for request cookies

v 0.0.6
---

  * Adds support for request files

v 0.0.5
---

  * Fixed a bug where `response.send()` can take two parameters, the status code and the data to send.

v 0.0.4
---

  * Adds a `request.session` that can be set during construction (or via calling the `_setSessionVariable()` method, and read as an object.

v 0.0.3
---

  * Adds a `request.query` that can be set during construction and read as an object.

v 0.0.2
---

  * Code refactoring of the `Response` mock.

v 0.0.1
---

  * Initial code banged out one late night...