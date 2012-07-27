/**
 * Settings:
 *      isRememberMe: boolean, configs whether to remember password for the login
 */

var _utils = require('IAUtils');
var _extend = _utils.extend;

var IASettings = {};

function _readSettings() {
	IASettings.isRememberMe = Ti.App.Properties.getBool('isRememberMe', false);
}

function _writeSettings() {
	Ti.App.Properties.setBool('isRememberMe', IASettings.isRememberMe);
}

exports.setSettingsInfo = function(settings) {
    _extend(settings, IASettings);
    _writeSettings();
}

exports.settingsInfo = function() {
	_readSettings();
    return IASettings;
}
