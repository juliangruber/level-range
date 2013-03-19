var levelup = require('levelup');
var db = levelup('/tmp/db');
var JSONStream = require('JSONStream');
var range = require('..');

db.batch([
  { type : 'put', key : 'bucket:a-bucket:0', value : 'some' },
  { type : 'put', key : 'bucket:a-bucket:1', value : 'test' },
  { type : 'put', key : 'bucket:a-bucket:2', value : 'data' },
  { type : 'put', key : 'bucket:another-one:0', value : 'nope' },
], function (err) {
  if (err) throw err;

  range(db, 'bucket:%s:', process.argv[2])
  .pipe(JSONStream.stringify())
  .pipe(process.stdout);
});
