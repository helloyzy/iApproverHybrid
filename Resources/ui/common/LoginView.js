exports.createLoginView = _loginView;

function _strTrim(str) {
    var pattern = new RegExp('(^\\s*)|(\\s*$)', 'g'); 
	return str.replace(pattern, '');
}

function _clone(src, target) {
	if (src && target) {
		for (prop in target) {
			src[prop] = target[prop];
		}
	}
}

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
		height:'70%',
		borderColor:'#BFBFBF',
		borderWidth:1,
		borderRadius:10,
		layout:'vertical'
	});
	
	function _inputControlHeight() {
		var osname = Ti.Platform.osname;
		if (osname == 'android') {
			return 70;
		} else {
			return 40;
		}
	}
	
	function _fontSize(size) {
		var osname = Ti.Platform.osname;
		if (osname == 'android') {
			return size + 5;
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
		_clone(lbl, props);
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
		_clone(text, props);
		return text;
	};
	
	var user = require('model/IAUser');
	user.init();
	var settings = require('model/IASettings');
	settings.init();
	
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
	// TODO display password on the setting remember me
	var txtPwd = _text(user.password, 'Input password', {
		passwordMask:true
	});
	loginView.add(txtPwd);
	
	var btn = Ti.UI.createButton({
		top:'5%',
		left:'5%',
		width:'30%',
		height:_inputControlHeight(),
		title: 'Log in'
	})
	loginView.add(btn);
	
	// event handling
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
		user.username = username;
		user.password = password;
		user.writeUserInfo({
		    username:username,
		    password:password //TODO store password if isRemember me on 
		});
		//TODO write settings 
	})
	
	
	loginBgView.add(loginView);	
	return loginBgView;
}

