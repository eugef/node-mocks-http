v 1.6.6
-------

  - Upgrade Fresh dependency to 0.5.2 due to a [Security advisory][166-SA]. [PR #147](https://github.com/howardabrams/node-mocks-http/pull/147)
  - Add the baseUrl property to the request object. [PR #150](https://github.com/howardabrams/node-mocks-http/pull/150)

  [166-SA]: https://nodesecurity.io/advisories/526

v 1.6.5
-------

  - Query type definition now more flexible [PR #146](https://github.com/howardabrams/node-mocks-http/pull/146)

v 1.6.4
-------

  - Incorporated a trimmed down published NPM artifact PR #141

v 1.6.3
-------

  - Moved @types/express to dev-dependencies. [PR #136][136]

  [136]: https://github.com/howardabrams/node-mocks-http/issues/136

v 1.6.1
-------

  - Fix for Issue #130 for method chaining for `cookie()` and `clearCookie()`
  - Fix for Issue #131 for adding `finished` to the response

v 1.6.0
-------

  - Dropping support for Node's "0" version, but will continue to support v4.
  - Verifying our builds with v6 (latest stable) as well as current work (v7)
  - Removing dependency on lodash and other bug fixes

v 1.5.4
-------

  * Call `write` method from json method of `responseMock` [PR #98][98]

  [98]: https://github.com/howardabrams/node-mocks-http/issues/98

v 1.5.3
-------

  * Add `.format` to the `mockResponse` object [PR #94][94]
  * Add `.location` to the `mockResponse` object [PR #96][96]
  * Add API method, `createMocks` to create both mocks with correct references

  [96]: https://github.com/howardabrams/node-mocks-http/issues/96
  [94]: https://github.com/howardabrams/node-mocks-http/issues/94

v 1.5.2
-------

  * Add case insensitive response headers [#85][85]
  * Fix behavior of `mockResponse.writeHead` [#92][92]
  * Add support for statusMessage [#84][84]
  * Fix issue with `req.param` not returning when false [#82][82]
  * Other bug fixes

  [92]: https://github.com/howardabrams/node-mocks-http/issues/92
  [84]: https://github.com/howardabrams/node-mocks-http/issues/84
  [82]: https://github.com/howardabrams/node-mocks-http/issues/82
  [85]: https://github.com/howardabrams/node-mocks-http/issues/85


v 1.5.1
-------

  * Add support for the `.vary()` response method

v 1.5.0
-------

Documentation changes, a new feature, and better behaviors, including:

  * Added `jsonp` method that takes a status code and a payload, see [PR #79][79]
  * Now able to attach non-standard properties to the mock request object. [PR #74][74]
  * param now takes a default value, see [PR #76][76]
  * Emit `end` when redirecting, see [PR #77][77]
  * Documentation changes, see [PR #64][64], [PR #75][75], [PR #78][78]

  [64]: https://github.com/howardabrams/node-mocks-http/issues/64
  [74]: https://github.com/howardabrams/node-mocks-http/issues/74
  [75]: https://github.com/howardabrams/node-mocks-http/issues/75
  [76]: https://github.com/howardabrams/node-mocks-http/issues/76
  [77]: https://github.com/howardabrams/node-mocks-http/issues/77
  [78]: https://github.com/howardabrams/node-mocks-http/issues/78
  [79]: https://github.com/howardabrams/node-mocks-http/issues/79


v 1.4.4
-------

  Bug fix release, including the following:
  * Fixed for [#67][67]
  * Merge fix for [#68][68]
  * Merge fix for [#70][70]
  * Merge fix for [#73][73]

  [67]: https://github.com/howardabrams/node-mocks-http/issues/67
  [68]: https://github.com/howardabrams/node-mocks-http/issues/68
  [70]: https://github.com/howardabrams/node-mocks-http/issues/70
  [73]: https://github.com/howardabrams/node-mocks-http/issues/73

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
