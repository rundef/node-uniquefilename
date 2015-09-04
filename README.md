# uniquefilename

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

## Options

TODO: work in progress

separator (default: -)
mode (default: numeric) numeric alpha ALPHA alphanumeric ALPHANUMERIC charset
if mode == charset, you have to specify the character set you are going to use (ie: 012345)