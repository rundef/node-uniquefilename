var fs 		= require('fs');
var path 	= require('path');


/*

    public static String encode(int number) {
        if (number == 0) {
            return ALPHABET.substring(0, 1);
        }

        StringBuilder code = new StringBuilder(16);

        while (number > 0) {
            int remainder = number % BASE;
            number /= BASE;

            code.append(ALPHABET.charAt(remainder));
        }

        return code.reverse().toString();
    }

     */
  

function numberToString77(nbr, charset, debug) {
	debug 			= debug || false;

	var charset_len = charset.length;
	var ret 		= '';

	while(nbr != 0) {
		var remainder = nbr % charset_len;
        nbr = parseInt(nbr / charset_len);
        //nbr = Math.round(nbr / charset_len);

        ret += charset.charAt(remainder);

        if(nbr < charset_len) {
        	if(nbr > 0) {
        	ret += charset.charAt(nbr);
        	}
        	break;
        }
	}

	return ret.split("").reverse().join("");
}


function numberToString55(nbr, charset) {
	var charset_len = charset.length;
	var ret 		= '';

	while(nbr > 0) {
		var remainder = nbr % charset_len;
		var multi = Math.floor(nbr / charset_len);
		if(multi > charset_len) {
			multi = charset_len;
		}


		if(modulo == 0) {
			ret = charset.charAt(charset_len-1) + ret;
			nbr -= (multi * charset_len);
			continue;
		}

		ret = charset.charAt(modulo-1) + ret;
		if(nbr < charset_len) {
			break;
		}
		nbr -= (multi * charset_len);
	}

	//if(nbr > 0) {
	//	ret += charset.charAt(nbr - 1);
	//}

	return ret;
}




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
	var charset_len = charset.length;
	var ret 		= '';
	var str_length  = 0;



	for(var maxpower = 5; maxpower >= 1; maxpower--) {
		if(str_length > 0) {

		}
		else {
			var maxvalue = Math.pow(charset_len, maxpower);
			for(var tmp = maxpower - 1; tmp >= 1; tmp--) {
				maxvalue += Math.pow(charset_len, tmp);
			}


			if(maxvalue < nbr) {
				str_length = maxpower;
				console.log(str_length);
			}
		}

	}
}



function numberToString5(nbr, charset) {
	debug = debug || false;
	var charset_len = charset.length;
	var ret 		= '';
	var str_length  = 0;



	for(var maxpower = 5; maxpower >= 1; maxpower--) {
		var tmp = Math.pow(charset_len, maxpower);
		var multi = Math.floor((nbr-1) / tmp);

		/*
		var power = len - i - 1;
		ret += Math.pow(charset_len, power) * (chrIndex + 1);
		*/



		if(tmp < nbr) {
if(debug) { console.log('maxpower='+maxpower+' nbr='+nbr+' tmp='+tmp+' multi='+multi); }

			var idx = multi - 1;
			idx = tmp/Math.pow(charset_len, (maxpower-1));
if(debug) { console.log('idx1='+idx); }
			if(idx >= charset_len) {
				idx = 0;
			}

			nbr -= (tmp*multi);
			//if(maxpower >= 1) {
			//	idx--;
			//}


if(debug) { console.log('idx='+idx+' rest='+nbr); }
			ret += charset.charAt(idx);
			if(nbr == 0) {
				return ret;
			}

/*
			if(multi > 0) {
				
				var idx = multi - 1;

				if(maxpower >= 2) {
					idx = nbr + 1;
				}

				ret += charset.charAt(idx);

				if(nbr == 0) {
					return ret;
				}

			}
			*/
		}
	}

	if(nbr > 0 && nbr <= charset_len) {
		ret += charset.charAt(nbr - 1);
	}

	return ret;
}



	


function findIncrementalUniqueFilename(file, options, callback) {
	var filename;
	var append = '';

	if (file.increment) {
		if(options.mode == 'numeric') {
			append = '' + file.increment;
		}
		else {
			var tmp = file.increment;
			

			if(tmp > 26) {
				var div = Math.floor(tmp / 26);
				tmp = tmp % 26;
			}

			if(tmp > 0) {
				append += String.fromCharCode(97 + tmp - 1);
			}
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
					file.increment = 2;
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