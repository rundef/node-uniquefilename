# uniquefilename

[![npm version](https://badge.fury.io/js/uniquefilename.svg)](http://badge.fury.io/js/uniquefilename) 
[![bitHound Score](https://www.bithound.io/github/rundef/uniquefilename/badges/score.svg)](https://www.bithound.io/github/rundef/uniquefilename)
[![Coverage Status](https://coveralls.io/repos/rundef/uniquefilename/badge.svg?branch=master)](https://coveralls.io/r/rundef/uniquefilenamebranch=master)

A module to get a unique filename using incremental values.

## Installing

#### `npm install uniquefilename`


## Basic example

```javascript
var uniquefilename = require('uniquefilename');
options = {};
uniquefilename.get('/path/to/dir/file.jpg', options, function(filename) {
	// your code here: filename might be "/path/to/dir/file.jpg", 
	// "/path/to/dir/file-2.jpg", "/path/to/dir/file-3.jpg", etc...
	// depending on the files that exist on your filesystem
});
```

## Advanced example

```javascript
var uniquefilename = require('uniquefilename');
options = {separator: '~', paddingCharacter: '0', paddingSize: 4, mode: 'alphanumeric'};
uniquefilename.get('/path/to/dir/file.jpg', options, function(filename) {
	// your code here: filename might be "/path/to/dir/file.jpg", 
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
	// your code here: filename might be "/path/to/dir/file.jpg", 
	// "/path/to/dir/file-002.jpg", "/path/to/dir/file-045.jpg", etc...
	// depending on the files that exist on your filesystem
});
```

## Using it with multer

Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
The following example shows you how to use multer along with this module to move an uploaded file to a unique filename :

```javascript
var multer 			= require('multer');
var path 			= require('path');
var uniquefilename 	= require('uniquefilename');

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