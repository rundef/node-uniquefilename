# uniquefilename

[![npm version](https://badge.fury.io/js/uniquefilename.svg)](http://badge.fury.io/js/uniquefilename) 
[![Travis](https://travis-ci.org/rundef/node-uniquefilename.svg?branch=master)](https://travis-ci.org/rundef/node-uniquefilename?branch=master) 
[![bitHound Score](https://www.bithound.io/github/rundef/node-uniquefilename/badges/score.svg)](https://www.bithound.io/github/rundef/node-uniquefilename)
[![Coverage Status](https://coveralls.io/repos/rundef/node-uniquefilename/badge.svg?branch=master&service=github)](https://coveralls.io/github/rundef/node-uniquefilename?branch=master)

A module to get a filename - that doesn't already exist on the filesystem - using incremental values.

## Install

```bash
npm install uniquefilename
```

## Usage

#### uniquefilename.get(filepath, [options], [callback])

### Basic example

```javascript
var uniquefilename = require('uniquefilename');
options = {};
uniquefilename.get('/path/to/dir/file.jpg', options, function(filename) {
  // filename might be "/path/to/dir/file.jpg", 
  // "/path/to/dir/file-2.jpg", "/path/to/dir/file-3.jpg", etc...
  // depending on the files that exist on your filesystem
});
```

### Example with promises

If a callback is not supplied, a Promise is returned ([using bluebird](https://www.npmjs.com/package/bluebird)).

```javascript
var uniquefilename = require('uniquefilename');
uniquefilename.get('/path/to/dir/file.jpg', {}).then(function (filename) {
  console.log(filename);
});
```

### Advanced example

```javascript
var uniquefilename = require('uniquefilename');
options = {separator: '~', paddingCharacter: '0', paddingSize: 4, mode: 'alphanumeric'};
uniquefilename.get('/path/to/dir/file.jpg', options, function(filename) {
  // filename might be "/path/to/dir/file.jpg", 
  // "/path/to/dir/file~000h.jpg", "/path/to/dir/file~00h9.jpg", etc...
  // depending on the files that exist on your filesystem
});
```

## Options

#### separator

If the specified filename exists, the separator will be added before the incremental value such as: `file{separator}2.jpg`

The default value is `'-'`.

#### mode

The mode allows you to specify which characters to use to generate the incremental value (the string after the separator)

The default value is `'numeric'`.

  - `'numeric'` Using the following characters: `1234567890`
  - `'alpha'` Using the following characters: `abcdefghijklmnopqrstuvwxyz`
  - `'ALPHA'` Using the following characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  - `'alphanumeric'` Using the following characters: `0123456789abcdefghijklmnopqrstuvwxyz`
  - `'ALPHANUMERIC'` Using the following characters: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  - `'charset'` You must specify the characters you wish to use in the `charset` option

#### paddingCharacter && paddingSize

If you wish to left-pad the incremental values with a character, use this option.
Here's an example :

```javascript
var uniquefilename = require('uniquefilename');
options = {mode: 'alpha', paddingCharacter: '0', paddingSize: 3};
uniquefilename.get('/path/to/dir/file.jpg', options, function(filename) {
  // filename might be "/path/to/dir/file.jpg", 
  // "/path/to/dir/file-002.jpg", "/path/to/dir/file-045.jpg", etc...
  // depending on the files that exist on your filesystem
});
```

#### alwaysAppend

If `alwaysAppend` is `true` filenames will include the seperator and attachment from the first request. So instead of
`file.jpg`, `file-2.jpg` you'd get `file-1.jpg`, `file-2.jpg`


## Using it with multer

Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
The following example shows you how to use multer along with this module to move an uploaded file to a unique filename :

```javascript
var multer      = require('multer');
var path      = require('path');
var uniquefilename  = require('uniquefilename');

router.use(multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      originalname = path.resolve('./public/uploads/' + file.originalname);
      options = {};
      uniquefilename.get(originalname, options, function(filename) {
         cb(null, path.basename(filename));
      });
    }
  })
}).single('thumbnail'));
```
