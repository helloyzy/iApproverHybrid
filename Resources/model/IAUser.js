var IAUser = new Object();
var IAUser_volatileProps = {
	token : true,
	userId : true
};

function _isVolatileProp(prop) {
	return IAUser_volatileProps[prop];
}

function _readUserInfo() {
    for (var prop in IAUser) {
    	IAUser[prop] = Ti.App.Properties.getString(prop, '');
    }
}

function _writeUserInfo() {
    for (var prop in IAUser) {
   		if (!_isVolatileProp(prop)) {
    		Ti.App.Properties.setString(prop, IAUser[prop]);
    	}
    }
}

exports.init = function() {
	IAUser.username = '';
	IAUser.password = '';
	// read properties from local file system
    _readUserInfo();
    IAUser.token = '';
    IAUser.userId = '';
}

/**
 * Set user info (username/password/token) to the cache and store the info
 * @param {Object} user
 */
exports.setUserInfo = function(user) {
    IAUser.extend(user);
    _writeUserInfo();
}

exports.userInfo = function() {
    return IAUser.clone();
}
