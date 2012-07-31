var _isIOS = require('IAUtils').isIOS;

function Indicator_IOS(message, pView) {
	
	// serves as a transparent background and also block user interaction 
	var bgView = Ti.UI.createView({
		backgroundColor:'#E6E6E6',
		opacity: 0.8,
		visible: false,
		top:'0%',
		left:'0%',
		width:'100%',
		height:'100%'
	});
	
	// create a view to hold the iOS activity indicator 
	var indicatorView = Ti.UI.createView({
		// backgroundColor:'gray',
		backgroundColor:'#11204B',
		borderColor:'#BFBFBF',
		borderWidth:3,
		borderRadius:15,
		top:'40%',
		left:'10%',
		width:'80%',
		height:'20%'
	});
	
	// ios specific indicator 
	var indicator = Ti.UI.createActivityIndicator({
		color:'white',
		font: {
			fontFamily:'Helvetica Neue', 
			fontSize:18, 
			fontWeight:'bold'
		},
		message:message,
		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	
	indicatorView.add(indicator);
	bgView.add(indicatorView);
	indicator.show();
	
	this._view = bgView;
	this._pView = pView;
}

Indicator_IOS.prototype.show = function() {
	this._pView.add(this._view);
	this._view.show();
}

Indicator_IOS.prototype.hide = function() {
	this._view.hide();
	this._pView.remove(this._view);
}

function _createIndicator_ios(message, pView) {
	return new Indicator_IOS(message, pView);
}

function _createIndicator_android(message) {
	var activityIndicator = Ti.UI.createActivityIndicator();
	activityIndicator.message = message;
	return activityIndicator;
}

/**
 * create activity indicator for different platforms, currently support ios and android
 * @param {Object} message
 * @param {Object} pView - ios only, the parent view which the indicator should be added to
 */
function _createIndicator(message, pView) {
	if (_isIOS()) {
		return _createIndicator_ios(message, pView);
	} else {
		return _createIndicator_android(message);
	}
}

exports.createIndicator = _createIndicator;