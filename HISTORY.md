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