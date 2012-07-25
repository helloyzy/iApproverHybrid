
var self = Ti.UI.createView();

var dvService = require("/ui/common/PVService").getService();

var selfDateArray = ["Sun\nMar 6", "Mon\nMar 7", "Tue\nMar 8", "Wed\nMar 9", "Thu\nMar 10", "Fri\nMar 11", "Sat\nMar 12"];

function DetailView() {
	addPeriodView();
	self.add(createTimeSheetRowsView());
	self.add(createRowDetailView());
	// Titanium.API.log("-----createTimeSheetRowsView--->" );
	//self.add([dvTable]);
	//self.add();
	
	// var lbl = Ti.UI.createLabel({
		// text:'Please select an item',
		// height:'auto',
		// width:'auto',
		// color:'#000'
	// });
	// self.add(lbl);
// 	
	self.addEventListener('itemSelected', function(e) {

		for (var i = self.children.length - 1; i >= 0; i--) {
			self.remove(self.children[i]);
		}

		
		Titanium.API.log("----dv----e.dateRange--->" + e.dateRange); 
		selfDateArray = dvService.convertDateRangeToDateTextArray(e.dateRange)
		Titanium.API.log("-----selfDateArray--->" + selfDateArray); 
		addPeriodView();
	

		
	});
	
	//drawUI();
	
	return self;
};

function createRowDetailView(){
	var result = Ti.UI.createTableView({
		top : "25%",
		left : "3%",
		width : "94%",
		height : 60 * 4,
		borderWidth : 1,
		borderRadius : 10,
		borderColor : "black",
		allowsSelection : false
	});
	var resultData = []; 

var attrArray = ["Type:", "Location:", "Project/Org.:", "Non-billable:", "Project Task:", "Client:", "Position/Task/Role:"];
var rowDetailMap = {

		"Type:" : "Salaried",
		"Location:" : "NonTravel",
		"Project/Org.:" : "Internal Time and Expense OS China",
		"Non-billable:" : "True",
		"Project Task:" : "Vacation",
		"Client:" : "Perficient",
		"Position/Task/Role:" : "Non Billable"

}

		
	var attrLength = attrArray.length;

	for (var i = 0, rowNum = attrLength / 2; i < rowNum; i++) { //rowNum is float type
		var row = Ti.UI.createTableViewRow({
			height : 60
		});
		var attrLabel = Ti.UI.createLabel({
			left : "2%",
			color : "black",
			font : {
				fontSize : 17,
				fontWeight : 'bold'
			},
			text : attrArray[2 * i]
		});
		row.add(attrLabel);

		var valueLabel = Ti.UI.createLabel({
			left : "27%",
			color : "black",
			width : "30%",
			font : {
				fontSize : 17
			},
			text : rowDetailMap[attrArray[2 * i]]
		});
		row.add(valueLabel);

		if (1 + 2 * i >= attrLength) {
			resultData.push(row);
			break;
		}

		var attrLabel2 = Ti.UI.createLabel({
			left : "60%",
			color : "black",
			font : {
				fontSize : 17,
				fontWeight : 'bold'
			},
			text : attrArray[1 + 2 * i]
		});
		row.add(attrLabel2);

		var valueLabel2 = Ti.UI.createLabel({
			left : "77%",
			color : "black",
			font : {
				fontSize : 17
			},
			text : rowDetailMap[attrArray[1 + 2 * i]]
		});
		row.add(valueLabel2);

		resultData.push(row);
	}

	result.setData(resultData);

	return result;

}

function createTimeSheetRowsView(){

	var result = Ti.UI.createTableView({
		top : "12%",
		left : "3%",
		width : "94%",
		height : 60,
		borderWidth : 1,
		borderRadius : 10,
		borderColor : "black",
		allowsSelection:true
	}); 

	var rowsData = [];

	var row = Ti.UI.createTableViewRow({
		height : 60 
	});
	
	for (var i = 1; i < 8; i++) {
		if (i === 7) {
			var approvalSwitch = Titanium.UI.createSwitch({
				left : 3.2 + 11.8 * i + "%",
				value : true
			});
			if (Ti.Platform.osname === "android") {
				approvalSwitch.style = Titanium.UI.Android.SWITCH_STYLE_CHECKBOX;
			}
			// approvalSwitch.addEventListener('change', function(e) {
				// Titanium.API.info('Basic Switch value = ' + e.value);
			// });
			row.add(approvalSwitch);
		} else {
			var hourLabel = Ti.UI.createLabel({
				left : 3.2 + 11.8 * i + "%",
				color : "black",
		    	touchEnabled: false,
				font : {
					fontSize : 17
				},
				text : "8.00"
			});
			row.add(hourLabel);
		}
	}



	
	
	rowsData.push(row);
	result.setData(rowsData);
	return result;


}


function addPeriodView() {
	selfDateArray.push("\nApproved");

	for (var i = 0, iLength = selfDateArray.length; i < iLength; i++) {
		var dateView = Ti.UI.createLabel({
			top : "4%",
			left : 6 + 11 * i + "%",
			color : "black",
			font : {fontSize : 17},
			text : selfDateArray[i]
		});
		self.add(dateView);
	}

}


// function drawUI() {
	// // Create the first TableViewSection
	// var section1 = Ti.UI.createTableViewSection({
		// headerTitle : selfDateArray.join("   ")
	// });
	// // use a loop to add some rows
	// // for (var i = 0; i < 4; i++) {
		// // section1.add(Ti.UI.createTableViewRow({
			// // title : 'Row ' + i
		// // }));
	// // }
	// // // do it all again...
	// var section2 = Ti.UI.createTableViewSection({
		// //headerTitle : 'Section 2'
	// });
	// for (var i = 4; i < 10; i++) {
		// section2.add(Ti.UI.createTableViewRow({
			// title : 'Row ' + i
		// }));
	// }
	// // Now, here's our table, and we're setting the data to hold the sections
	// // var tv = Ti.UI.createTableView({
		// // data : [section1, section2]
	// // });
	// dvTable.setData([section1]);
	// dvTable2.setData([section2]);
// }


module.exports = DetailView;
