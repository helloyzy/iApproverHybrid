
var self = Ti.UI.createView();

var dvService = require("/ui/common/PVService").getService();

var selfDateArray = null; //["Sun\nMar 6", "Mon\nMar 7", "Tue\nMar 8", "Wed\nMar 9", "Thu\nMar 10", "Fri\nMar 11", "Sat\nMar 12"];

var selfDateHourMapArray = null; // [{"Mon\nJul 16" : "8.00", "identity" :"a number","rowElement", rowElement}];

var selfRowDetailView = null;

var selfSubmitButton = null;

var selfHourTableView = null;


function DetailView() {
	self.addEventListener('itemSelected', function(e) {
		for (var i = self.children.length - 1; i >= 0; i--) {
			self.remove(self.children[i]);
		}

		selfDateArray = dvService.convertDateRangeToDateTextArray(e.dateRange)
		addPeriodView();

		dvService.afterWrapingDetailViewData = detailViewCallBack;
		dvService.getDetailViewData(e.selectedApproval);
		
	});

	selfSubmitButton = Titanium.UI.createButton({
		bottom : 0,
		left : 0,
		title : 'Submit'
	});
	selfSubmitButton.addEventListener('click', function(e) {
		Titanium.API.info("You clicked the Submit button");
		
		Titanium.API.info("tableview.data--->" +selfHourTableView.data);
		Titanium.API.info("tableview.data[0]--->" +selfHourTableView.data[0]);
		Titanium.API.info("tableview.data[0].rows--->" +selfHourTableView.data[0].rows);
		

        var submitRowInfoArray = [];
		var rowArray = selfHourTableView.data[0].rows;
		for (var rowIndex = 0; rowIndex < rowArray.length; rowIndex++) {
			var row = rowArray[rowIndex];
			var theSwitch = row.children[row.children.length - 1];
			var approvalStatus = theSwitch.value === true ? "APPROVAL_PENDING" : "DISAPPROVAL_PENDING";
			Titanium.API.info("theSwitch--->" + theSwitch.value);
			Titanium.API.info("approvalStatus--->" + approvalStatus);
			var rowInfo = {
				"approvalStatus" : approvalStatus,
				"submitRow" : selfDateHourMapArray[rowIndex].rowElement,
			}
			submitRowInfoArray.push(rowInfo);
		}

        dvService.getApprovalSoap(submitRowInfoArray);

	});

	return self;
};


function detailViewCallBack() {

	selfDateHourMapArray = dvService.getDateHourMapArray();
	selfHourTableView = createTimeSheetRowsView();
	self.add(selfHourTableView);

	selfHourTableView.fireEvent("click", {
		index : 0
	});

    self.add(selfSubmitButton);

}


function createRowDetailView(rowDetailMap){
	var result = Ti.UI.createTableView({
		top : 25 + (selfDateHourMapArray.length-1)*10 + "%",
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
// var rowDetailMap = {
// 
		// "Type:" : "Salaried",
		// "Location:" : "NonTravel",
		// "Project/Org.:" : "Internal Time and Expense OS China",
		// "Non-billable:" : "True",
		// "Project Task:" : "Vacation",
		// "Client:" : "Perficient",
		// "Position/Task/Role:" : "Non Billable"
// 
// }

		
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
		height : 60 * selfDateHourMapArray.length,
		borderWidth : 1,
		borderRadius : 10,
		borderColor : "black",
		allowsSelection : true
	});

	result.addEventListener('click', function(e) {
		if(selfRowDetailView!=null){
			self.remove(selfRowDetailView)
		}
		
		var selectedIndex = e.index
		var rowIdentity = selfDateHourMapArray[selectedIndex].identity;
		var rowDetailMap = dvService.getRowsDetail()[rowIdentity];
		selfRowDetailView = createRowDetailView(rowDetailMap);
		self.add(selfRowDetailView); 
		
	}); 


	result.setData(createHourRowsData());
	return result;

}

function createHourRowsData(){
	var rowsData = []; 

    var rowNum = selfDateHourMapArray.length;
    Titanium.API.log("-----selfDateHourMapArray--->" + selfDateHourMapArray);
	
	for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
		var row = Ti.UI.createTableViewRow({
			height : 60
		}); 

		var dateHourMap = selfDateHourMapArray[rowIndex];
		for (var dateIndex = 0, dLength = selfDateArray.length; dateIndex < dLength; dateIndex++) {
			var dateText = selfDateArray[dateIndex];
			var hourText = dateHourMap[dateText];
			if (hourText != undefined) {
				var hourLabel = Ti.UI.createLabel({
					left : 3.2 + 11.8 * dateIndex + "%",
					color : "black",
					touchEnabled : false,
					font : {
						fontSize : 17
					},
					text : hourText
				});
				row.add(hourLabel);
			}
		}

		var approvalSwitch = Titanium.UI.createSwitch({
			left : 3.2 + 11.8 * selfDateArray.length + "%",
			value : true,
			touchEnabled : true
		});
		if (Ti.Platform.osname === "android") {
			approvalSwitch.style = Titanium.UI.Android.SWITCH_STYLE_CHECKBOX;
		}

		approvalSwitch.addEventListener('change', function(e) {
			Titanium.API.info('Basic Switch value = ' + e.value);
		}); 

		row.add(approvalSwitch); 
		rowsData.push(row);
			
	}
    return rowsData;
}

function addPeriodView() {
	//selfDateArray.push("\nApproved");
	for (var i = 0, iLength = selfDateArray.length; i <= iLength; i++) {
		var dateView = Ti.UI.createLabel({
			top : "4%",
			left : 6 + 11 * i + "%",
			color : "black",
			font : {fontSize : 17},
			text : i !== iLength ? selfDateArray[i] : "\nApproved"

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
