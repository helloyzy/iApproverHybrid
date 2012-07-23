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
