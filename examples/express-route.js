var httpMocks = require('../lib/http-mock');

// Suppose we have the following magical Express incantation:
//
//     app.get('/user/:id', mod.aroute);
//
// And we have ourselves a function to answer that call:

var aroute = function( request, response ) {

    var id = request.params.id;
    console.log("We have a '%s' request for %s (ID: %d)", 
                request.method, request.url, id);

    var body = { 
            name: 'Bob Dog',
            age: 42, 
            email: 'bob@dog.com'
    };
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.send( JSON.stringify(body), 'utf8' );
    response.end();
};

// -----------------------------------------------------------------
//   In another file, we can now test that function, like so:

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