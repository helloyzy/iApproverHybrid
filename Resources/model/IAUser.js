var IAUser = {};

var _extend = require('utils').extend;

function _readUserInfo() {
    IAUser.username = Ti.App.Properties.getString('username', '');
    IAUser.password = Ti.App.Properties.getString('password', '');
}

function _writeUserInfo() {
    Ti.App.Properties.setString('username', IAUser.username);
    Ti.App.Properties.setString('password', IAUser.password);
}

exports.init = function() {
    _readUserInfo();
    IAUser.token = '';
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
    var result = {};
    _extend(IAUser, result);
    return result;
}
