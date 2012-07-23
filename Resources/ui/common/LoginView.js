exports.createLoginView = _loginView;

var _strTrim = require('utils').strTrim;
var _extend = require('utils').extend;

function _loginView() {
	
	var bgColor = '#E6E6E6';
	var fgColor = 'white'; // '#FOFOFO';
	
	var loginBgView = Ti.UI.createView({
		backgroundColor:bgColor,
		top:0,
		left:0,
		width:'100%',
		height:'100%'
	});
	
	var loginView = Ti.UI.createScrollView({
		backgroundColor:fgColor,
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
	
	function _controlHeight(androidHeight, iOSHeight, otherHeight) {
		var osname = Ti.Platform.osname;
		if (osname == 'android') {
			return androidHeight;
		} else if (osname == 'ipad' || osname == 'iphone') {
			return iOSHeight;
		} else {
			return otherHeight;
		}
	}
	
	function _inputControlHeight() {
		return _controlHeight(70, 40, 40);
	}
	
	function _fontSize(size) {
		var osname = Ti.Platform.osname;
		if (osname == 'android') {
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
			height:_inputControlHeight(),
			clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONBLUR,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		});
		_extend(props, text); // add customized props
		return text;
	};
	
	var userModule = require('model/IAUser');
	userModule.init();
	var settingsModule = require('model/IASettings');
	settingsModule.init();
	
	var user = userModule.userInfo();
	var isRemMe = settingsModule.settingsInfo().isRememberMe;
	
	loginView.add(_label('Log in', {
		color: 'black',
		// shadowColor: '#aaa',
		// shadowOffset: {x:2, y:2},
		font:{fontWeight:'bold', fontSize:_fontSize(30)}
	}));
	
	loginView.add(_label('Username'));
	var txtUsername = _text(user.username, 'Input username', {
		autocapitalization:	Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});
	loginView.add(txtUsername);
	
	loginView.add(_label('Password'));
	var txtPwd = _text(isRemMe ? user.password:'', 'Input password', {
		passwordMask:true
	});
	loginView.add(txtPwd);
	
	var remMeViewHeight = _controlHeight(70, 30);
	var remMeView = Ti.UI.createView({
		top:'5%',
		left:0,
		width:'100%',
		height:remMeViewHeight,
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
		font:{fontWeight:'normal', fontSize:_fontSize(16)},
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
		settingsModule.setSettingsInfo({
		    isRememberMe:isRemMe
		});
		if (!isRemMe) { // clear password in the properties
			userModule.setUserInfo({
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
		//TODO verify username and password against Primavera
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
		verifyUserInfo(username, password);
		userModule.setUserInfo({
		    username:username,
		    password:remMeSwitch.value ? password : ''
		});
	})
	
	
	loginBgView.add(loginView);	
	return loginBgView;
}

