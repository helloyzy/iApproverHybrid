function getUserToken() {
	var url = 'https://stlpv1.perficient.com/primavera/web/?urlVer=3&task=flexTimeAndExpense';
	Ti.API.log(url);
	var request = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.log(this.responseText);
		},
		onerror: function(e) {
			Ti.API.error(e.error);
		},
		timeout:10000
	});
	request.open('GET', url);
	request.send();
}

function verifyUserInfo(username, password) {
	var url = 'https://stlpv1.perficient.com/primavera/web'; 
	// var url = 'https://stlpv1.perficient.com/primavera/web/command/command?'; 
	// var parameters = 'username=' + username + '&password=' + password;
	// var encodedParams = Ti.Network.encodeURIComponent(parameters);
	// var url = url + encodedParams;
	Ti.API.log(url);
	var request = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.log(this.responseText);
		},
		onerror: function(e) {
			Ti.API.error(e.error);
			getUserToken();
		},
		timeout:10000
	});
	request.open('POST', url);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	
	// request.send();
	
	request.send({
		username:username,
		password:password
	});
}