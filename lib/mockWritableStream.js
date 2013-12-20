/*
 * http://nodejs.org/api/stream.html#stream_writable_stream
 */

function WritableStream() {}

WritableStream.prototype.writable = function () {};
// WritableStream.prototype.write = function(string, [encoding], [fd]){}
// WritableStream.prototype.write = function(buffer){}
WritableStream.prototype.end = function () {};
// WritableStream.prototype.end = function(string, encoding){}
// WritableStream.prototype.end = function(buffer){}
WritableStream.prototype.destroy = function () {};
WritableStream.prototype.destroySoon = function () {};

module.exports = WritableStream;