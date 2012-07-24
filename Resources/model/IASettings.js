/**
 * Settings:
 *      isRememberMe: boolean, configs whether to remember password for the login
 */

var IASettings = {};
var _extend = require('utils').extend;
var _clone = require('utils').clone;

function _readSettings() {
	IASettings.isRememberMe = Ti.App.Properties.getBool('isRememberMe', false);
}

function _writeSettings() {
	Ti.App.Properties.setBool('isRememberMe', IASettings.isRememberMe);
}

exports.init = function () {
    _readSettings();
}

exports.setSettingsInfo = function(settings) {
    _extend(settings, IASettings);
    _writeSettings();
}

exports.settingsInfo = function() {
    return _clone(IASettings);
}
