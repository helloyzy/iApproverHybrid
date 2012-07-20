//Master View Component Constructor

var mvService = require("/ui/common/PVService").getService();
var mvTable = Ti.UI.createTableView({});

function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	mvService.getTimeReportCallback = mainViewCallback;
	mvService.getLocationMap(mvService.locationCallback);
		
	self.add(mvTable);
	//add behavior
	mvTable.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			price:e.rowData.price
		});
	});
	
	return self;
};


function mainViewCallback(){
	var doc = this.responseXML.documentElement;
	Titanium.API.log("-----getTimeReportCallback.responseText--->" + this.responseText);

    var mainViewRows = [];
	var approvals = doc.getElementsByTagName("approvals");
	for (var i = 0; i < approvals.length; i++) {
		var row = {};
		var theApproval = approvals.item(i);
		row['name'] = theApproval.getAttribute("personName");
		row['hours'] = parseInt(theApproval.getAttribute("detailCount"))/60 + " hours";
		row['location'] = mvService.locationOfApproval(theApproval, doc);
		row['dateRange'] = mvService.dateRangeOfApproval(theApproval, doc);
        mainViewRows.push(row);
	}
    
    for (var i = 0; i < mainViewRows.length; i++) {
		Titanium.API.log("-----row.name--->" +mainViewRows[i]['name']);
		Titanium.API.log("-----row.hours--->" +mainViewRows[i]['hours']);
		Titanium.API.log("-----row.location--->" +mainViewRows[i]['location']);
		Titanium.API.log("-----row.dateRange--->" +mainViewRows[i]['dateRange']);
	}

	mvTable.setData(getTableDataFromMainViewRows(mainViewRows));
	
}

function getTableDataFromMainViewRows(mainViewRows){
	 var tableData = [];
	 for (var i = 0; i < mainViewRows.length; i++) {
		var row = Ti.UI.createTableViewRow();
		
		var name = Ti.UI.createLabel({
			top : 5,
			left : 10,
			font:{fontFamily:'Arial',fontWeight:'bold',fontSize:17},
			text : mainViewRows[i]['name']
		});
		var dateRange = Ti.UI.createLabel({
			top : 5,
			left : 170,
			text : mainViewRows[i]['dateRange']
		});
		var location = Ti.UI.createLabel({
			Top : 25,
			left : 10,
			height : 30,
			text : mainViewRows[i]['location']
		});
		var hours = Ti.UI.createLabel({
			Top : 25,
			left : 170,
			height : 30,
			text : mainViewRows[i]['hours']
		});

		row.add(name);
		row.add(dateRange);
		row.add(location);
		row.add(hours);

		tableData.push(row);
	}
	return tableData;
}


module.exports = MasterView;