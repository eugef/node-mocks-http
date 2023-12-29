const httpMocks = require('../lib/http-mock');

// Suppose you have the following Express route:

//     app.get('/user/:id', routeHandler);

// And you have created a function to handle that route's call:

const routeHandler = function (request, response) {
    const { id } = request.params;

    console.log("We have a '%s' request for %s (ID: %d)", request.method, request.url, id);

    const body = {
        name: 'Bob Dog',
        age: 42,
        email: 'bob@dog.com'
    };

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.send(JSON.stringify(body), 'utf8');
    response.end();
};

// -----------------------------------------------------------------
// In another file, you can easily test the routeHandler function
// with some code like this using the testing framework of your choice:

exports['routeHandler - Simple testing'] = function (test) {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/user/42',
        params: {
            id: 42
        }
    });

    const response = httpMocks.createResponse();

    routeHandler(request, response);

    const data = response._getJSONData();

    test.equal('Bob Dog', data.name);
    test.equal(42, data.age);
    test.equal('bob@dog.com', data.email);

    test.equal(200, response.statusCode);
    test.ok(response._isEndCalled());
    test.ok(response._isJSON());
    test.ok(response._isUTF8());

    test.done();
};
