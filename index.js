var fs = require('fs')
  , path = require('path')
  , Promise = require('bluebird')
  , str = require('./str');


exports.get = module.exports.get = findUniqueFilename;


function findUniqueFilename(filepath, options, callback) {
  var file  = {};
  file.dir  = path.dirname(filepath);
  file.ext  = path.extname(filepath);
  file.base   = path.basename(filepath, file.ext);

  options = options || {};
  options.separator = options.separator || '-';
  options.mode = options.mode || 'numeric';

  charsets = {
    "alpha":      "abcdefghijklmnopqrstuvwxyz",
    "alphanumeric":   "0123456789abcdefghijklmnopqrstuvwxyz",
    "ALPHA":      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "ALPHANUMERIC" :  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  };

  if(options.mode != 'numeric') {
    if(charsets[options.mode]) {
      options.charset = charsets[options.mode];
      options.mode = 'charset';
    }
    else if(options.mode != 'charset' || (options.mode == 'charset' && !options.charset)) {
      options.mode = 'numeric';
    }
  }

  if(options.paddingSize && !options.paddingCharacter) {
    options.paddingCharacter = '0';
  }

  if (typeof callback === 'function') {
    return findIncrementalUniqueFilename(file, options, callback);
  }
  else {
    return new Promise(function (resolve, reject) {
      findIncrementalUniqueFilename(file, options, function (filename) {
        resolve(filename);
      });
    });
  }
};



function findIncrementalUniqueFilename(file, options, callback) {
  var filename;
  var append = '';

  if (file.increment) {
    if(options.mode == 'numeric') {
      append = '' + file.increment;
    }
    else {
      append = str.numberToString(file.increment, options.charset);
    }
    
    

    if(options.paddingSize) {
      while(append.length < options.paddingSize) {
        append = options.paddingCharacter + append;
      }
    }

    append = options.separator + append;
  }

  filename = path.join(file.dir, file.base + append + file.ext);
  fs.exists(filename, function(exists) {
    if (exists) {
      setImmediate(function() {
        if(file.increment) {
          file.increment += 1;
        }
        else {
          file.increment = options.mode == 'numeric' ? 2 : 1;
        }
        return findIncrementalUniqueFilename(file, options, callback);
      });
    } else {
      return callback(filename);
    }
  });
}
