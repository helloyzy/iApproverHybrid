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

function IAServiceStub (request, url, action, params) {
	request.timeout = IAService.settings.timeout;
	// setup timeout
	this._timeout_status = IAService.consts.TIMEOUT_INIT;
	this._timeoutid = -1;
	
	this._onload = request.onload;
	this._onerror = request.onerror;
	request.onload = this.decorateWithTimeout(this._onload);
	request.onerror = this.decorateWithTimeout(this._onerror);
	if (action == 'POST') {
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
	}
	request.open(action, url);
	params ? request.send(params) : request.send();
	//TODO this in timeout refers to ??
	this._timeoutid = setTimeout(IAService.settings.timeoutCheck, function(){
		this._onerror();
		this._timeout_status = IAService.consts.TIMEOUT_TRIGGERED;
	});
}

IAServiceStub.prototype.isTimeout = function() {
	return this._timeout_status == IAService.consts.TIMEOUT_TRIGGERED;
}

IAServiceStub.prototype.decorateWithTimeout = function(callback) {
	return function(e) {
		if (!this.isTimeout()) {
			clearTimeout(this._timeoutid);
			callback(e);
		}
	};
}

IAService.GET = function(request, url) {
	request.timeout = IAService.settings.timeout;
	var _timeout_status = IAService.consts.TIMEOUT_INIT;
	var _timeoutid = -1;
	var _onload = request.onload;
	var _onerror = request.onerror;
	function isTimeout() {
		return _timeout_status == IAService.consts.TIMEOUT_TRIGGERED;
	}
	function decorateWithTimeout(callback) {
		return function(e) {
			if (!isTimeout()) {
				clearTimeout(_timeoutid);
				callback(e);
			}
		};
	}
	request.onload = decorateWithTimeout(_onload);
	request.onerror = decorateWithTimeout(_onerror);
	request.open('GET', url);
	request.send();
	_timeoutid = setTimeout(function(){
		_onerror();
		_timeout_status = IAService.consts.TIMEOUT_TRIGGERED;
	}, IAService.settings.timeoutCheck);
}

IAService.POST = function(request, url, params) {
	request.timeout = IAService.timeout;
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
	request.open('POST', url);
	request.send(params);
}

exports.GET = IAService.GET;
exports.POST = IAService.POST;