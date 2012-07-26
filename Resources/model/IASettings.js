/**
 * Settings:
 *      isRememberMe: boolean, configs whether to remember password for the login
 */

var IASettings = new Object();

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
    IASettings.extend(settings);
    _writeSettings();
}

exports.settingsInfo = function() {
    return IASettings.clone();
}
