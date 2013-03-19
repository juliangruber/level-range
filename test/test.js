var test = require('tap').test;
var os = require('os');
var levelup = require('levelup');
var db = levelup(os.tmpDir() + '/level-range-test');
var range = require('..');

test('level-range', function (t) {
  db.batch([
    { type : 'put', key : 'bucket:a-bucket:0', value : 'some' },
    { type : 'put', key : 'bucket:a-bucket:1', value : 'test' },
    { type : 'put', key : 'bucket:a-bucket:2', value : 'data' },
    { type : 'put', key : 'bucket:another-one:0', value : 'nope' },
  ], function (err) {
    if (err) throw err;

    var pairs = [];

    range(db, 'bucket:%s:', 'a-bucket')
    .on('data', function (pair) { pairs.push(pair) })
    .on('end', function () {
      t.deepEqual(pairs, [
        { key : '0', value : 'some' },  
        { key : '1', value : 'test' },  
        { key : '2', value : 'data' },  
      ]);
      t.end();
    })
  });
});
