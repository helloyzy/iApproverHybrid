var _utils = require('IAUtils');
var _extend = _utils.extend;
var _strTrim = _utils.strTrim;
var _strBetween = _utils.strBetween;
var _isIOS = _utils.isIOS;
var _isAndroid = _utils.isAndroid;
var _createIndicator = require('ui/common/IAActivityIndicator').createIndicator;
var _userModule = require('model/IAUser');
var _settingsModule = require('model/IASettings');
var _userService = require('service/IAUserService');

function _controlHeight(androidHeight, iOSHeight, otherHeight) {
	if (_isAndroid()) {
		return androidHeight;
	} else if (_isIOS()) {
		return iOSHeight;
	} else {
		return otherHeight;
	}
}

function _inputControlHeight() {
	return _controlHeight(70, 40, 40);
}

function _fontSize(size) {
	if (_isAndroid()) {
		return size + 8;
	}
	return size;
}

function _label(text,props) {		
	var lbl = Ti.UI.createLabel({
		top:'5%',
		left:'5%',
		text:text,
		color:'gray',
		font:{fontWeight:'bold', fontSize:_fontSize(18)}
	});		
	_extend(props, lbl); // add customized props 
	return lbl;
};

function _text(value, hintText, props) {
	var text = Ti.UI.createTextField({
	    value:value,
		hintText:hintText,
		top:'5%',
		left:'5%',
		width:'90%',
		height:_inputControlHeight()
	});
	if (_isIOS()) {
		text.clearButtonMode = Ti.UI.INPUT_BUTTONMODE_ONBLUR;
		text.borderStyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	}
	_extend(props, text); // add customized props
	return text;
};

function _createLoginView() {
	
	var loginBgView = Ti.UI.createView({
		backgroundColor:'#E6E6E6',
		top:0,
		left:0,
		width:'100%',
		height:'100%'
	});
	
	var loginView = Ti.UI.createScrollView({
		backgroundColor:'white',
		top:'10%',
		left:'5%',
		contentWidth:'auto',
		contentHeight:'auto',
		width:'90%',
		height:'80%',
		borderColor:'#BFBFBF',
		borderWidth:1,
		borderRadius:10,
		layout:'vertical'
	});
	
	var user = _userModule.userInfo();
	var isRemMe = _settingsModule.settingsInfo().isRememberMe;
	
	loginView.add(_label('Log in', {
		color: 'black',
		font: {
			fontWeight:'bold', 
			fontSize:_fontSize(30)
		}
	}));
	
	loginView.add(_label('Username'));
	var txtUsername = _text(user.username, 'Input username', {
		// autocapitalization:	Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
		keyboardType : Ti.UI.KEYBOARD_NAMEPHONE_PAD
	});
	loginView.add(txtUsername);
	
	loginView.add(_label('Password'));
	var txtPwd = _text(isRemMe ? user.password : '', 'Input password', {
		passwordMask:true
	});
	loginView.add(txtPwd);
	
	var remMeView = Ti.UI.createView({
		top:'5%',
		left:0,
		width:'100%',
		height:_controlHeight(70, 30, 30),
		layout:'horizontal'
	});
	var remMeSwitch = Ti.UI.createSwitch({
		titleOn:'Yes',
		titleOff:'No',
		value:isRemMe,
		top: 0,
		width: '30%',
		left: '5%'
	});
	remMeView.add(_label('Remember me', {
		left: '7%',
		top: '2%',
		font: {
			fontWeight:'normal', 
			fontSize:_fontSize(16)
		},
		width: '50%'
	}));
	remMeView.add(remMeSwitch);
	loginView.add(remMeView);
	
	var btn = Ti.UI.createButton({
		top:'3%',
		left:'5%',
		width:'35%',
		height:_inputControlHeight(),
		title: 'Log in'
	});
	loginView.add(btn);
	
	// event handling
	remMeSwitch.addEventListener('change', function(e) {
		var isRemMe = e.source.value; // e.source --> switch control
		_settingsModule.setSettingsInfo({
		    isRememberMe:isRemMe
		});
		if (!isRemMe) { // clear password in the properties if checking off 'Remember me'
			_userModule.setUserInfo({
			    password:''
			});
		}
	});	
	
	btn.addEventListener('click', function(e) {	
	    var username = _strTrim(txtUsername.value);
	    var password = _strTrim(txtPwd.value);
		if (!username) {
			alert('Please input your user name!');
			txtUsername.focus();
			return;
		} else if (!password) {
			alert('Please input your password!');
			txtPwd.focus();
			return;
		}
		var activityIndicator = _createIndicator('Authenticating user...', loginBgView);
		function validationFailure(errorMsg) {
			activityIndicator.hide();
			var errorDialog = Ti.UI.createAlertDialog({
				message: errorMsg ? errorMsg : 'Please check your network connection and try again!',
				ok: 'OK',
				title: 'Authentication Failure'
			});
			errorDialog.show();
		}
		
		function validationSuccess() {
			var _userToken_onload = function(e) {
				activityIndicator.hide();
				var responseStr = e.source.responseText;
				var userToken = Ti.Network.decodeURIComponent(_strBetween(responseStr,'AuthInfo', '&timeout='));
				var userId = _strBetween(responseStr, '&userOID=', '&configureExpenses=');
				_userModule.setUserInfo({
				    username:_strTrim(txtUsername.value),
				    password:remMeSwitch.value ? _strTrim(txtPwd.value) : '',
				    userId:userId,
				    token:userToken
				});
			};
			var _userToken_onerror = function(e) {
				validationFailure();
			}
			_userService.getUserToken(_userToken_onload, _userToken_onerror);
		}
		var _verifyUser_onload = function(e) {
			var responseStr = e.source.responseText;
			if (responseStr.indexOf('<title>Not Authenticated</title>') < 0) {
				validationSuccess();
			} else {
				validationFailure('Username or password incorrect, please check it!');
			}
		};
		var _verifyUser_onerror = function(e) {
			// only for iOS, skip this error
			if (e.error.indexOf('The request failed because it redirected too many times') >= 0) {
				validationSuccess();
			} else {
				validationFailure();
			}
		};
		
		_userService.verifyUser(username, password, _verifyUser_onload, _verifyUser_onerror);
		activityIndicator.show();
	});
	
	loginBgView.add(loginView);	
	return loginBgView;
}

exports.createLoginView = _createLoginView;