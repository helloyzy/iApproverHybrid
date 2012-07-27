var _utils = require('IAUtils');
var _extend = _utils.extend;

var IAUser = { 
	username : '',
	password : '',
	token : '',
	userId : ''
};
var IAUser_volatileProps = {
	token : true,
	userId : true
};

function _isVolatileProp(prop) {
	return IAUser_volatileProps[prop];
}

function _readUserInfo() {
    for (var prop in IAUser) {
   		if (!_isVolatileProp(prop)) {
    		IAUser[prop] = Ti.App.Properties.getString(prop, '');
    	}
    }
}

function _writeUserInfo() {
    for (var prop in IAUser) {
   		if (!_isVolatileProp(prop)) {
    		Ti.App.Properties.setString(prop, IAUser[prop]);
    	}
    }
}

/**
 * Set user info (username/password/token) to the cache and store the info
 * @param {Object} user
 */
exports.setUserInfo = function(user) {
    _extend(user, IAUser);
    _writeUserInfo();
}

exports.userInfo = function() {
	_readUserInfo();
    return IAUser;
}
