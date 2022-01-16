var ChunkyStream = require('chunky-stream');
var StdoutStream = require('./lib/stdout-stream');
var ThrottleStream = require('./lib/throttle-stream');
var CloudWatchStream = require('./lib/cloudwatch-stream');

const fn = function (options, errorHandler) {
  options = options || {};
  options.ignoreEmpty = true;

  var log = new CloudWatchStream(options);
  var chunk = new ChunkyStream(options);
  var throttle = new ThrottleStream();
  var stdout = new StdoutStream(options);

  chunk.use(require('./lib/max-length'));
  chunk.use(require('./lib/max-size'));

  if (typeof errorHandler === 'function') {
    log.on('error', errorHandler);
  }

  log.on('flushed', function () {
    stdout.emit('flushed')
  });

  stdout.pipe(chunk).pipe(throttle).pipe(log);

  return stdout;
};

module.exports = fn;
module.exports.default = fn;
