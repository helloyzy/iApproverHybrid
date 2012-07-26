var _service = require('service/IAService');
var _get = _service.GET;
var _post = _service.POST;

function _getUserToken(onload, onerror) {
	var url = 'https://stlpv1.perficient.com/primavera/web/?urlVer=3&task=flexTimeAndExpense';
	var request = Ti.Network.createHTTPClient({
		onload: onload,
		onerror: onerror
	});
	_get(request, url, null, null, null);
}

function _verifyUser(username, password, onload, onerror) {
	var url = 'https://stlpv1.perficient.com/primavera/web'; 
	var request = Ti.Network.createHTTPClient({
		onload: onload,
		onerror: onerror
	});
	// request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	_post(request, url, {
		username:username,
		password:password
	}, null, null);
}

exports.getUserToken = _getUserToken;
exports.verifyUser = _verifyUser;