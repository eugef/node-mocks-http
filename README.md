node-mocks-http
---

Mock 'http' objects for testing [Express](http://expressjs.com/)
routing functions, but could be used for testing any
[Node.js](http://www.nodejs.org) web server applications that have
code that requires mockups of the `request` and `response` objects.

Installation
---

This project is available as a
[NPM package](https://www.npmjs.org/package/node-mocks-http).

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

You can easily test the `routeHandler` function with some code like
this using the testing framework of your choice:

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

We also wanted the mocks to act like the original framework being
mocked, but allow for setting of values before calling and inspecting
of values after calling.

For Developers
---

We are looking for more volunteers to bring value to this project,
including the creation of more objects from the
[HTTP module](http://nodejs.org/docs/latest/api/http.html).

This project doesn't address all features that must be
mocked, but it is a good start. Feel free to send pull requests,
and a member of the team will be timely in merging them.

After making any changes, please verify your works.

Running Tests
---

Install `jshint` globally.

```bash
npm install -g jshint
```

Navigate to the project folder and run `npm install` to install the
project's dependencies.

Then simply run the tests.

```bash
./run-tests
```

Release Notes
---

Most releases fix bugs with our mocks or add features similar to the
actual `Request` and `Response` objects offered by Node.js and extended
by Express.


License
---

Licensed under [MIT](https://github.com/howardabrams/node-mocks-http/blob/master/LICENSE).
