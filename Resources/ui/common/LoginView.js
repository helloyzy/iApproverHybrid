exports.createLoginView = _loginView;

function _strTrim(str) {
	return str.replace('/(^/s*)|(/s*$)/g', '');
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
	
	function _text(hintText, props) {
		var text = Ti.UI.createTextField({
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
	
	loginView.add(_label('Log in', {
		color: 'black',
		// shadowColor: '#aaa',
		// shadowOffset: {x:2, y:2},
		font:{fontWeight:'bold', fontSize:_fontSize(30)}
	}));
	
	loginView.add(_label('Username'));
	var txtUsername = _text('Input username', {
		autocapitalization:	Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});
	loginView.add(txtUsername);
	
	loginView.add(_label('Password'));
	var txtPwd = _text('Input password', {
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
		if (!txtUsername.value) {
			alert('Please input your user name!');
			txtUsername.focus();
			return;
		} else if (!txtPwd.value) {
			alert('Please input your password!');
			txtPwd.focus();
			return;
		}
	})
	
	
	loginBgView.add(loginView);	
	return loginBgView;
}

