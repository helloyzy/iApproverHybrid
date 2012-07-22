exports.strTrim = function(str) {
    var pattern = new RegExp('(^\\s*)|(\\s*$)', 'g'); 
    return str.replace(pattern, '');
}

/**
 * Clone properties from target to src
 * @param {Object} src
 * @param {Object} target
 */
exports.clone = function(src, target) {
    if (src && target) {
        for (prop in target) {
            src[prop] = target[prop];
        }
    }
}