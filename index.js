var util = require('util');
var through = require('through');

module.exports = createRangeStream;

/**
 * Range stream
 *
 * @param {LevelUp} db
 * @param {String} prefix
 * @param {Object, ...} (vars)
 */

function createRangeStream (db, prefix) {
  prefix = util.format.apply(null, [].slice.call(arguments).slice(1));

  return db.createReadStream({
    start : prefix,
    end : prefix + '~'
  }).pipe(through(function (entry) {
    entry.key = entry.key.slice(prefix.length);
    this.queue(entry);
  }));
}
