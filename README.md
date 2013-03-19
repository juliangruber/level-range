# level-range

Find all K/V-pairs prefixed by a certain key.

An often used range query when working with
[leveldb](https://github.com/rvagg/node-levelup).

[![Build Status](https://travis-ci.org/juliangruber/level-range.png)](https://travis-ci.org/juliangruber/level-range)

## Usage

Given this data stored in a leveldb at `/tmp/db`:

```json
{
  "bucket:a-bucket:0" : "some",
  "bucket:a-bucket:1" : "test",
  "bucket:a-bucket:2" : "data",
  "bucket:another-one:0" : "nope"
}
```

and a script `test.js` that takes `argv` and outputs found data:

```js
var levelup = require('levelup');
var db = levelup('/tmp/db');
var JSONStream = require('JSONStream');
var range = require('level-range');

range(db, 'bucket:%s:', process.argv[2])
.pipe(JSONStream.stringify())
.pipe(process.stdout);
```

The output will be:

```bash
$ node test.js a-bucket
[
{"key":"0","value":"some"}
,
{"key":"1","value":"test"}
,
{"key":"2","value":"data"}
]

$ node test.js another-bucket
[
{"key":"0","value":"nope"}
]
```

## API

### range(db, prefix, args...)

Create a range stream. `args` will be fed into `util.formt` together with `prefix` so you can
use placeholders there.

## O Rly?

Yeah, I've written those lines once too often. **Twice**.

## Installation

With [npm](http://npmjs.org) do:

```bash
$ npm install level-range
```

## License

(MIT)
