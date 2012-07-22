var IAUser = {};

function _readUserInfo() {
    //TODO read username and password, excluding token
}

function _writeUserInfo() {
    // TODO write username and password to the local cache, excluding token
}

exports.init = function() {
    // read from local cache
    _readUserInfo();
    IAUser.username = '';
    IAUser.password = '';
    IAUser.token = '';
}

/**
 * Set user info (username/password/token) to the cache and store the info
 * @param {Object} user
 */
exports.setUserInfo = function(user) {
    var utils = require('utils');
    utils.clone(IAUser, user);
    _writeUserInfo();
}

exports.userInfo = function() {
    var result = {};
    var utils = require('utils');
    utils.clone(IAUser, result);
    return result;
}
