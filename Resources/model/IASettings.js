/**
 * Settings:
 *      isRememberMe: boolean, configs whether to remember password for the login
 */

var IASettings = {};

function _readSettings() {
}

function _writeSettings() {
}

exports.init = function () {
    _readSettings();
    IASettings.isRememberMe = false;
}

exports.writeSettings = function(settings) {
    require('utils').clone(IASettings, settings);
    _writeSettings();
}

exports.settingsInfo = function() {
    return require('utils').clone(IASettings, {});
}
