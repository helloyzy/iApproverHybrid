var _bind = require('IAUtils').bind;

var IAService = {
	settings: {
		timeout:15000, // timeout setting used in the httpclient
		timeoutCheck:20000 // setting used in the settimeout function
	},
	consts: {
		TIMEOUT_INIT:0,
		TIMEOUT_TRIGGERED:1 // when in this state, not triggering any further onload/onerror action
	}
};

function IAServiceStub() {
	// setup timeout
	this._timeout_status = IAService.consts.TIMEOUT_INIT;
	this._timeoutid = -1;
}

IAServiceStub.prototype.isTimeout = function() {
	return this._timeout_status == IAService.consts.TIMEOUT_TRIGGERED;
}

IAServiceStub.prototype.decorateWithTimeout = function(callback) {
	return _bind(this, function(e) {
		if (e.error) {  // log error message if it has any
			Ti.API.error(e.error);
		}
		if (!this.isTimeout()) {
			clearTimeout(this._timeoutid);
			callback(e);
		}
	});
}

IAServiceStub.prototype.send = function(request, url, action, params, httpHeadParams) {
	request.timeout = IAService.settings.timeout;
	
	this._onload = request.onload;
	this._onerror = request.onerror;
	request.onload = this.decorateWithTimeout(this._onload);
	request.onerror = this.decorateWithTimeout(this._onerror);
	
	Ti.API.info('[IAService send] Send request with url:' + url);
	request.open(action, url);
	if (httpHeadParams) {
		for (var headerParam in httpHeadParams) {
			request.setRequestHeader(headerParam, httpHeadParams[headerParam]);
		}
	}
	params ? request.send(params) : request.send();
	
	this._timeoutid = setTimeout(_bind(this, function(){
		this._timeout_status = IAService.consts.TIMEOUT_TRIGGERED;
		this._onerror({
			error:'[IAService timeout callback] Request time out.'
		});
	}), IAService.settings.timeoutCheck);
}

IAService.GET = function(request, url, params, httpHeadParams) {
	var service = new IAServiceStub();
	service.send(request, url, 'GET', params, httpHeadParams);
}

IAService.POST = function(request, url, params, httpHeadParams) {
	// add Content-Type to the header if it is not set
	var headParams = httpHeadParams ? httpHeadParams : {};
	if (!headParams['Content-Type']) {
		headParams['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	var service = new IAServiceStub();
	service.send(request, url, 'POST', params, headParams);
}

exports.GET = IAService.GET;
exports.POST = IAService.POST;