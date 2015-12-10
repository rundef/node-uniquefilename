function sumOfPowerFromOne(base, maxpower) {
  var value = 0;
  for(var tmp = maxpower; tmp >= 1; tmp--) {
    value += Math.pow(base, tmp);
  }
  return value;
}



module.exports.stringToNumber = function(str, charset) {
  var len     = str.length;
  var charset_len = charset.length;
  var ret     = 0;

  for(var i = 0; i < len; i++) {
    var power     = len - (i + 1);
    var chr     = str.charAt(i);
    var chrIndex  = 1 + charset.indexOf(chr);
    ret += chrIndex * Math.pow(charset_len, power);
  }

  return ret;
};



module.exports.numberToString = function(nbr, charset) {
  var charset_len   = charset.length;
  var str_len     = 0;
  var str_this_len  = 0;
  var tmp;

  for(var maxpower = 20; maxpower >= 0; maxpower--) {
    var maxvalue = sumOfPowerFromOne(charset_len, maxpower);

    if(maxvalue < nbr) {
      str_len    = maxpower + 1;
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
    var initial = sumOfPowerFromOne(charset_len, str_len - 1);


    for(tmp = charset_len; tmp >= 1; tmp--) {
      var tmp_cmp = initial + (tmp * str_this_len);
      if(tmp_cmp < nbr)
        break;
    }

    nbr -= tmp * str_this_len;
    str += charset.charAt(tmp - 1);
  }

  return str;
};