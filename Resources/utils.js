/**
 * substring of str between left and right
 */
exports.strBetween = function(str, left, right) {
	var leftIndex = str.indexOf(left);
	if (leftIndex < 0) {
		return '';
	}
	var startIndex = leftIndex + left.length;
	var endIndex = str.indexOf(right, startIndex);
	if (endIndex >= 0) {
		return str.substring(startIndex, endIndex);
	}
	return '';
}

exports.strTrim = function(str) {
    var pattern = new RegExp('(^\\s*)|(\\s*$)', 'g'); 
    return str.replace(pattern, '');
}

/**
 * Clone a object which has all properties from src
 * @param {Object} src
 */
exports.clone = function(src) {
    var resutl = null;
    if (src) {
    	result = {};
    	for (prop in src) {
            result[prop] = src[prop];
        }
    }
    return result;
}

/**
 * Copy properties from src to target
 * @param {Object} src
 * @param {Object} target
 */
exports.extend = function(src, target) {
	if (src && target) {
        for (prop in src) {
            target[prop] = src[prop];
        }
    }
}

exports.bind = function(thisRef, func) {
	return function() {
		return func.apply(thisRef, arguments);
	};
}
