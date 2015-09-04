# uniquefilename

[![NPM Version][npm-image]][npm-url]

A module to get a unique filename.
*This module is not finished, do not use it yet*

## Installing.

#### `npm install uniquefilename`


## Basic example.

```javascript
var uniquefilename = require('uniquefilename');
options = {};
uniquefilename.get('/path/to/dir/file.jpg', options, function(filename) {
	// your code here: filename might be "/path/to/dir/file.jpg", "/path/to/dir/file-2.jpg", "/path/to/dir/file-3.jpg", etc...
	// depending on the files that exist on your filesystem
});
```

## Advanced example.

```javascript
var uniquefilename = require('uniquefilename');
options = {};
uniquefilename.get('/path/to/dir/file.jpg', {separator: '~', paddingCharacter: '0', paddingSize: 4, mode: 'alphanumeric'}, function(filename) {
	// your code here: filename might be "/path/to/dir/file.jpg", "/path/to/dir/file~000h.jpg", "/path/to/dir/file~00h9.jpg", etc...
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

  - `'numeric'` The incremental value will only contains the following characters: `1234567890`
  - `'alpha'` The incremental value will only contains the following characters: `abcdefghijklmnopqrstuvwxyz`
  - `'ALPHA'` The incremental value will only contains the following characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  - `'alphanumeric'` The incremental value will only contains the following characters: `0123456789abcdefghijklmnopqrstuvwxyz`
  - `'ALPHANUMERIC'` The incremental value will only contains the following characters: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  - `'charset'` TODO

#### paddingCharacter && paddingSize

TODO: work in progress

separator (default: -)
mode (default: numeric) numeric alpha ALPHA alphanumeric ALPHANUMERIC charset
if mode == charset, you have to specify the character set you are going to use (ie: 012345)