const httpMocks = require('../lib/http-mock');

// Suppose you have the following Express route:

//     app.post('/users', routeHandler);

// And you have created a function to handle that route's call:

const routeHandler = function (request, response) {
    console.log("We have a '%s' request for %s", request.method, request.url);

    const body = {
        name: 'Bob Dog',
        age: 42,
        email: 'bob@dog.com'
    };

    response.status(201).json(body);
    response.end();
};

// -----------------------------------------------------------------
// In another file, you can easily test the routeHandler function
// with some code like this using the testing framework of your choice:

exports['routeHandler - Simple testing of status() vs json()'] = function testing(test) {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/users'
    });

    const response = httpMocks.createResponse();

    routeHandler(request, response);

    const data = response._getJSONData();

    test.equal('Bob Dog', data.name);
    test.equal(42, data.age);
    test.equal('bob@dog.com', data.email);

    test.equal(201, response.statusCode);
    test.ok(response._isJSON());

    test.done();
};
