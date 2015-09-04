var fs 		= require('fs');
var path 	= require('path');




function stringToNumber(str, charset) {
	var len 		= str.length;
	var charset_len = charset.length;
	var ret 		= 0;

	for(var i = 0; i < len; i++) {
		var power 		= len - (i + 1);
		var chr 		= str.charAt(i);
		var chrIndex 	= 1 + charset.indexOf(chr);
		ret += chrIndex * Math.pow(charset_len, power);
	}

	return ret;
}




function numberToString(nbr, charset) {
	if(nbr == 1)
		return charset.charAt(0);

	var charset_len 	= charset.length;
	var str_len  		= 0;
	var str_this_len 	= 0;


	for(var maxpower = 5; maxpower >= 0; maxpower--) {
		var maxvalue = Math.pow(charset_len, maxpower);
		for(var tmp = maxpower - 1; tmp >= 1; tmp--) {
			maxvalue += Math.pow(charset_len, tmp);
		}

		if(maxvalue < nbr) {
			str_len  	 = maxpower + 1;
			str_this_len = (maxvalue + Math.pow(charset_len, maxpower + 1)) - maxvalue;

			break;
		}
	}


	if(str_len == 0)
		return null;


	var str = '';
	while(--str_len >= 0) {
		if(str_len == 0) {
			str += charset.charAt(nbr - 1);
			break;
		}

		
		str_this_len = Math.pow(charset_len, str_len);
		var initial = 0;
		var tmp = 0;
		for(tmp = str_len - 1; tmp >= 1; tmp--) {
			initial += Math.pow(charset_len, tmp);
		}
		for(tmp = charset_len; tmp >= 1; tmp--) {
			var tmp_cmp = initial + (tmp * str_this_len);
			if(tmp_cmp < nbr)
				break;
		}

		nbr -= tmp * str_this_len;
		str += charset.charAt(tmp - 1);
	}

	return str;
}


	


function findIncrementalUniqueFilename(file, options, callback) {
	var filename;
	var append = '';

	if (file.increment) {
		if(options.mode == 'numeric') {
			append = '' + file.increment;
		}
		else {
			append = numberToString(file.increment, options.charset);
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


module.exports.get = function(filepath, options, callback) {
	var file 	= {};
	file.dir 	= path.dirname(filepath);
	file.ext 	= path.extname(filepath);
	file.base 	= path.basename(filepath, file.ext);

	if(!options.separator) {
		options.separator = '-';
	}

	if(options.paddingSize && !options.paddingCharacter) {
		options.paddingCharacter = '0';
	}

	if(!options.mode) {
		options.mode = 'numeric';
	}
	else if(options.mode == 'alpha') {
		options.mode = 'charset';
		options.charset = 'abcdefghijklmnopqrstuvwxyz';
	}
	else if(options.mode == 'alphanumeric') {
		options.mode = 'charset';
		options.charset = '0123456789abcdefghijklmnopqrstuvwxyz';
	}
	else if(options.mode == 'ALPHA') {
		options.mode = 'charset';
		options.charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	else if(options.mode == 'ALPHANUMERIC') {
		options.mode = 'charset';
		options.charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	else if(options.mode != 'charset' || !options.charset) {
		options.mode = 'numeric';
	}

	return findIncrementalUniqueFilename(file, options, callback);
}

module.exports.numberToString = numberToString;
module.exports.stringToNumber = stringToNumber;