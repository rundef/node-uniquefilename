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
	var tmp;

	for(var maxpower = 5; maxpower >= 0; maxpower--) {
		var maxvalue = Math.pow(charset_len, maxpower);
		for(tmp = maxpower - 1; tmp >= 1; tmp--) {
			maxvalue += Math.pow(charset_len, tmp);
		}

		if(maxvalue < nbr) {
			str_len  	 = maxpower + 1;
			str_this_len = (maxvalue + Math.pow(charset_len, maxpower + 1)) - maxvalue;

			break;
		}
	}


	if(str_len === 0)
		return null;


	var str = '';
	while(--str_len >= 0) {
		if(str_len === 0) {
			str += charset.charAt(nbr - 1);
			break;
		}

		
		str_this_len = Math.pow(charset_len, str_len);
		var initial = 0;
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

module.exports.numberToString = numberToString;
module.exports.stringToNumber = stringToNumber;