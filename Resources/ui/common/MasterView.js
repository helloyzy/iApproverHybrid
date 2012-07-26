//Master View Component Constructor

var mvService = require("/ui/common/PVService").getService();
var mvTable = Ti.UI.createTableView({
	allowsSelection:true,
	// selectedBackgroundColor: 'blue',
	// touchEnabled: true
});
var selfMainViewRows = null;

function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	mvService.masterViewCallback = mainViewCallback;
	mvService.getLocationMap(mvService.locationCallback);
		
	self.add(mvTable);
	//add behavior
	mvTable.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			selectedApproval : selfMainViewRows[e.index]['approval'],
			dateRange : selfMainViewRows[e.index]['dateRange']
		});

		//Titanium.API.log("-----dateRange to detailView----->" + selfMainViewRows[e.index]['dateRange']); 
		//Titanium.API.log("-----e.index;--->" + e.index); 
		
	});
	
	return self;
};


function mainViewCallback(){
	// var doc = this.responseXML.documentElement;
	// Titanium.API.log("-----mainViewCallback.responseText--->" + this.responseText);
// 
    // selfMainViewRows = [];
	// var approvals = doc.getElementsByTagName("approvals");
	// for (var i = 0; i < approvals.length; i++) {
		// var row = {};
		// var theApproval = approvals.item(i);
		// row['name'] = theApproval.getAttribute("personName");
		// row['hours'] = parseInt(theApproval.getAttribute("detailCount"))/60 + " hours";
		// row['location'] = mvService.locationOfApproval(theApproval, doc);
		// row['dateRange'] = mvService.dateRangeOfApproval(theApproval, doc);
		// row['dateRangeFormatted'] = mvService.formatDateRange(row['dateRange']);
        // selfMainViewRows.push(row);
	// }
//     
    // // for (var i = 0; i < selfMainViewRows.length; i++) {
		// // Titanium.API.log("-----row.name--->" +selfMainViewRows[i]['name']);
		// // Titanium.API.log("-----row.hours--->" +selfMainViewRows[i]['hours']);
		// // Titanium.API.log("-----row.location--->" +selfMainViewRows[i]['location']);
		// // Titanium.API.log("-----row.dateRange--->" +selfMainViewRows[i]['dateRange']);
		// // Titanium.API.log("-----row.dateRangeFormatted--->" +selfMainViewRows[i]['dateRangeFormatted']);
	// // }
    
	selfMainViewRows = mvService.getMasterViewRowsData()
	mvTable.setData(getTableDataFromMainViewRows(selfMainViewRows)); 

	
}

function getTableDataFromMainViewRows(mainViewRows){
	 var tableData = [];

	 for (var i = 0; i < mainViewRows.length; i++) {
		var row = Ti.UI.createTableViewRow({
			//selectedBackgroundColor : "blue",
			height : 51.2  //51.2 = 1024*5%
		});
		
		var name = Ti.UI.createLabel({
			top : "5%",
			left : "2%",
			width : "55%",
			color: "black",
			touchEnabled: false,
			font:{ fontWeight:'bold', fontSize:17},
			text : mainViewRows[i]['name']
			//text : "SiSi, StevenSteven"
		});
		var dateRangeFormatted = Ti.UI.createLabel({
			top : "5%",
			left : "60%",
			width : "40%",
			color: "black",
			touchEnabled: false,
			text : mainViewRows[i]['dateRangeFormatted']
			//text : "11-23"
		});
		var location = Ti.UI.createLabel({
			top : "45%",
			left : "2%",
			width : "55%",
			color: "black",
			touchEnabled: false,
			text : mainViewRows[i]['location']
			//text : "Nontravel/China"
		});
		var hours = Ti.UI.createLabel({
			top : "45%",
			left : "60%",
			width : "40%",
			color: "black",
			touchEnabled: false,
			text : mainViewRows[i]['hours']
			//text : "40 hours"
		});

		row.add(name);
		row.add(dateRangeFormatted);
		row.add(location);
		row.add(hours);

		tableData.push(row);
	}
	return tableData;
}


module.exports = MasterView;