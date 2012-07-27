
Ti.include(Titanium.Filesystem.resourcesDirectory+'ui/common/DateFormatter.js');

var pvService = new Object();
exports.getService =function(){
	return pvService;
}

pvService.locationIdentyToName = null;
pvService.masterViewRowsData = null;
pvService.masterViewResponseDoc = null;
pvService.dateHourMapArray = null;
pvService.rowsDetail = null;
var detailXml = null;

//---------------------------------------------------below is getTimeSheetRowsDetail code----------------------------------------------------------------------------------

pvService.getDetailViewSoap = function(approval){
    // var username = "vernon.stinebaker";
	// var token = "AuthInfo:baf8a9fc0cdb24431f08035858a0751c88839a8c75288f81f85a14de4465cd42360b70f9828ce16b4cc634d01f3a834f27a7085e9cf6ef642ddaeb33adc5a0f72ec76792aded4abd97ca89b471fb22c25b259bad5bcf48f7477d4013f983921abea35372c67890019cad6f71714a7e6d1396e7f3ddbc40cd170b3c49b508780127a7085e9cf6ef64176133cdb3fbbab3117de1aa19a771eeeb9e571e532281dcd4be2e61c7ac76bbd42e59c2c044118eaa06489eb37b58ef1c00e4aa2b97a5b53726577792f436e20e2fedeef315dc060c3ee20f3962b65937ba1474fdf311605aa4e9ea48b14501606cf6cc46c844ad1f08035858a0751c88839a8c75288f8131a0cc748446ecd61addbed56bd8780bbe8136e644d2b400ae2ff9ba42f5a53ca272ee281b82333db566634c7af5b21b224e591a64acfafaac6719494e3903d3305846dc171389ea36651f9afc31a4690b213d4e86c2be0a74dc52abd0b4fc8e776d53c554c36b929364c18acd95156986c7e20196bd78cee33370c9d3421dbc";
	// var userID = "0_2690_25053";
	

	var username =  "rita.chen";
	var token = "AuthInfo:baf8a9fc0cdb24431f08035858a0751c88839a8c75288f81f85a14de4465cd42360b70f9828ce16b4cc634d01f3a834f27a7085e9cf6ef642ddaeb33adc5a0f72ec76792aded4abd97ca89b471fb22c25b259bad5bcf48f7477d4013f983921abea35372c67890019cad6f71714a7e6d1396e7f3ddbc40cd170b3c49b508780127a7085e9cf6ef64176133cdb3fbbab3117de1aa19a771eeeb9e571e532281dcd4be2e61c7ac76bbd42e59c2c044118eaa06489eb37b58ef1c00e4aa2b97a5b53726577792f436e20e2fedeef315dc060c3ee20f3962b65937ba1474fdf311605aa4e9ea48b14501606cf6cc46c844ad1f08035858a0751c88839a8c75288f8131a0cc748446ecd61addbed56bd8780bbe8136e644d2b400ae2ff9ba42f5a53ca272ee281b82333db566634c7af5b21b224e591a64acfafaac6719494e3903d3305846dc171389ea36651f9afc31a4690b213d4e86c2be0a866e425ac4bb3164c28c497bbbc937ff5c39e8c69fed443c";
	var userID = "0_2820_25053";


	var approvalIdentity = approval.getAttribute("identity");
	var aaprovalReportIdentity = pvService.approvalIdentityToReportIdentity(pvService.masterViewResponseDoc)[approvalIdentity];
	var approvalUserRefOid = approval.getElementsByTagName("userRef").item(0).getAttribute("oid");


	var s='';
                                
	s += "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
	s += "<SOAP-ENV:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">"
	s += "<SOAP-ENV:Body>"
	s += "<cmd:projectionRequest version=\"9.0sp1b, Build 09\" username=\""
	s += username
	s += "\" password=\""
	s += token
	s += "\" xsi:type=\"ns1:ProjectionRequest\" includeInactive=\"true\" xmlns:cmd=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\" xmlns:oper=\"http://primavera.com/schemas/pvapi/PVOperational.xsd\" xmlns:ns1=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\">"
	s += "<clientProjection filter=\"referenced by client on Project\" namedFilter=\"TE_CLIENT_PROJECTION\" expandAll=\"false\" xsi:type=\"ns2:ClientProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<locationProjection filter=\"referenced by location on TimeSheetRow\" xsi:type=\"ns2:LocationProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<timeReportingPeriodProjection filter=\"referenced by financialPeriod on TimeReport\" xsi:type=\"ns2:TimeReportingPeriodProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<orgUnitProjection filter=\"referenced by costCenter on TimeSheetRow\" expandAll=\"false\" xsi:type=\"ns2:OrgUnitProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<projectProjection filter=\"referenced by project on TimeSheetRow \" namedFilter=\"TE_PROJECT_PROJECTION\" expandAll=\"false\" xsi:type=\"ns2:ProjectProjectionSpecification\" expandTeamsAndPositions=\"true\" expandWBS=\"false\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<resourceProjection filter=\"identity in worker on User\" namedFilter=\"TE_RESOURCE_PROJECTION\" expandAll=\"false\" xsi:type=\"ns2:ResourceProjectionSpecification\" expandSkillEducationCertification=\"false\" expandSchedule=\"false\" expandContactInfo=\"false\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<taskProjection filter=\"referenced by projectTask on TimeSheetRow\" expandAll=\"false\" xsi:type=\"ns2:TaskProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<timeReportProjection filter=\"(identity = "
	// s += [[approval reportRef] identity]
	s += aaprovalReportIdentity
	s += ")  AND user = "
	// s += [[approval userRef] oid]
	s += approvalUserRefOid
	s += "\" expandAll=\"false\" xsi:type=\"ns2:TimeReportProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"

	s += "<timeSheetRowProjection filter=\"timeReport in identity on TimeReport AND approvalUser in {"
	s += userID
	s += "}\" expandAll=\"false\" xsi:type=\"ns2:TimeSheetRowProjectionSpecification\" expandCells=\"true\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"

	s += "<transactionTypeProjection filter=\"referenced by transactionType on TimeSheetRow\" xsi:type=\"ns2:TransactionTypeProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "<userProjection filter=\"identity = "
	s += approvalUserRefOid
	s += " OR referenced by approvalUser on TimeSheetRow\" xsi:type=\"ns2:UserProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
	s += "</cmd:projectionRequest>"
	s += "</SOAP-ENV:Body>"
	s += "</SOAP-ENV:Envelope>"

    Titanium.API.log("-----getDetailViewSoap--->" + s);
    return s
}

pvService.getDetailViewData = function(approval) {
	pvService.postSoap('executeProjectionRequest', pvService.getDetailViewSoap(approval), pvService.getDetailViewDataCallBack);
}

pvService.getDetailViewDataCallBack = function(){
	Titanium.API.log("-----getDetailViewDataCallBack.responseText--->" + this.responseText);

	var doc = this.responseXML.documentElement;
	initDateHourMapArrayWithDoc(doc);
	initRowsDetailWithDoc(doc);

	pvService.afterWrapingDetailViewData();
}

pvService.getRowsDetail = function(){
	Titanium.API.log("-----pvService.getRowsDetail --->");
	return pvService.rowsDetail;
}

function initRowsDetailWithDoc(doc){
	detailXml = {};
	//init to reload when get next time
	// timeSheetRowsOfDoc(doc);
	// projectsOfDoc(doc);
	// transactionTypesOfDoc(doc);
	// tasksOfDoc(doc);
	// clientsOfDoc(doc);
	// positionsOfDoc(doc);

	pvService.rowsDetail = {};

	var rowArray = timeSheetRowsOfDoc(doc);
	for (var i = 0; i < rowArray.length; i++) {
		var row = rowArray[i];
		if (!pvService.isTimeSheetRowValid(row.identity, doc)) {
			continue;
		}

		var rowProjectClientRef = projectsOfDoc(doc)[row.projectRef].clientRef;
		var rowDetailMap = {
			"Type:" : transactionTypesOfDoc(doc)[row.transactionTypeRef].name,
			"Location:" : pvService.locationIdentityToLocationName()[row.locationRef],
			"Project/Org.:" : projectsOfDoc(doc)[row.projectRef].name,
			"Non-billable:" : row.billable === "false" ? "False" : "True",

			"Project Task:" : tasksOfDoc(doc)[row.taskRef].name,
			"Client:" : clientsOfDoc(doc)[rowProjectClientRef].name,
			"Position/Task/Role:" : positionsOfDoc(doc)[row.positionRef].name
		}
		pvService.rowsDetail[row.identity] = rowDetailMap;
	}

}



function timeSheetRowsOfDoc(doc) {
	if (detailXml.timeSheetRowArray !== undefined) {
		return detailXml.timeSheetRowArray;
	}
	detailXml.timeSheetRowArray = [];
	var rowArray = doc.getElementsByTagName("timeSheetRows");
	for (var i = 0; i < rowArray.length; i++) {
		var row = rowArray.item(i);
		var rowMap = {
			"identity" : row.getAttribute("identity"),
			"billable" : row.getAttribute("billable"),
			"transactionTypeRef" : row.getElementsByTagName("transactionTypeRef").item(0).getAttribute("identity"),
			"locationRef" : row.getElementsByTagName("locationRef").item(0).getAttribute("identity"),
			"projectRef" : row.getElementsByTagName("projectRef").item(0).getAttribute("identity"),
			"positionRef" : row.getElementsByTagName("positionRef").item(0).getAttribute("identity"),
			"taskRef" : row.getElementsByTagName("taskRef").item(0).getAttribute("identity")
		}
		detailXml.timeSheetRowArray.push(rowMap);
	}
	return detailXml.timeSheetRowArray
}




function projectsOfDoc(doc) {
	if (detailXml.projectsMap !== undefined) {
		return detailXml.projectsMap;
	}
	detailXml.projectsMap = {};
	var projectsArray = doc.getElementsByTagName("projects");

	for (var i = 0; i < projectsArray.length; i++) {
		var project = projectsArray.item(i);
		var identity = project.getAttribute("identity");
		var name = project.getAttribute("name");
		var clientRef = project.getElementsByTagName("clientRef").item(0).getAttribute("identity")
		detailXml.projectsMap[identity] = {
			"name" : name,
			"clientRef" : clientRef
		};
	}
	return detailXml.projectsMap
}


function transactionTypesOfDoc(doc){
	if (detailXml.transactionTypesMap !== undefined) {
		return detailXml.transactionTypesMap;
	}
	detailXml.transactionTypesMap = {};
	var typeArray = doc.getElementsByTagName("transactionTypes");
	for (var i = 0; i < typeArray.length; i++) {
		var type = typeArray.item(i);
		var identity = type.getAttribute("identity");
		var name = type.getAttribute("name");
		detailXml.transactionTypesMap[identity] = {
			"name" : name
		};
	}
	return detailXml.transactionTypesMap;

}

function tasksOfDoc(doc){
	if (detailXml.tasksMap !== undefined) {
		return detailXml.tasksMap;
	}
	detailXml.tasksMap = {};
	var taskArray = doc.getElementsByTagName("tasks");
	for (var i = 0; i < taskArray.length; i++) {
		var task = taskArray.item(i);
		var identity = task.getAttribute("identity");
		var name = task.getAttribute("name");
		detailXml.tasksMap[identity] = {
			"name" : name
		};
	}
	return detailXml.tasksMap;
}

function positionsOfDoc(doc){
	if (detailXml.positionsMap !== undefined) {
		return detailXml.positionsMap;
	}
	detailXml.positionsMap = {};
	var positionArray = doc.getElementsByTagName("positions");
	for (var i = 0; i < positionArray.length; i++) {
		var position = positionArray.item(i);
		var identity = position.getAttribute("identity");
		var name = position.getAttribute("name");
		detailXml.positionsMap[identity] = {
			"name" : name
		};
	}
	return detailXml.positionsMap;
}

function clientsOfDoc(doc){
	if (detailXml.clientsMap !== undefined) {
		return detailXml.clientsMap;
	}
	detailXml.clientsMap = {};
	var clientArray = doc.getElementsByTagName("clients");
	for (var i = 0; i < clientArray.length; i++) {
		var client = clientArray.item(i);
		var identity = client.getAttribute("identity");
		var name = client.getAttribute("name");
		detailXml.clientsMap[identity] = {
			"name" : name
		};
	}
	return detailXml.clientsMap;
}







function initDateHourMapArrayWithDoc(doc){
	pvService.dateHourMapArray = [];
	var rowArray = doc.getElementsByTagName("timeSheetRows");
	for (var i = 0; i < rowArray.length; i++) {
		var row = null;
		var cellArray = rowArray.item(i).getElementsByTagName("timeSheetCells");
		for (var j = 0; j < cellArray.length; j++) {
			var cell = cellArray.item(j);
			var approvalStatus = cell.getElementsByTagName("approvalStatus").item(0).text;
			if (approvalStatus.indexOf("SUBMITTED") !== -1) {
				var cellHour = (parseFloat(cell.getAttribute("cellMinutes")) / 60).toFixed(2);
				var cellDate = pvService.formatXmlDateToDetailViewDate(cell.getAttribute("cellDate"));
				row = row !==null ? row : {};
				row[cellDate] = cellHour;
				row.identity = rowArray.item(i).getAttribute("identity");
			}
		}
		if (row !== null) {
			pvService.dateHourMapArray.push(row);
		}
	}
}

pvService.afterWrapingDetailViewData = function(){
    //implement in DetailView
}

pvService.getDateHourMapArray = function(){
	Titanium.API.log("-----getDateHourMapArray--->" + pvService.dateHourMapArray);
	return pvService.dateHourMapArray;
}


pvService.formatXmlDateToDetailViewDate = function(xmlDate) {
	return pvService.parseStringToDate(xmlDate).format("ddd\nmmm d");
}

















//---------------------------------------------------below is getTimeReport code----------------------------------------------------------------------------------
pvService.getTimeReport = function(callback) {
	pvService.postSoap('executeProjectionRequest', pvService.getMainViewSoap(), callback);
}

pvService.getTimeReportCallback = function() {
	Titanium.API.log("-----getTimeReportCallback.responseText--->" + this.responseText);
	pvService.masterViewResponseDoc = this.responseXML.documentElement;
    initMasterViewRowsDataWithDoc(pvService.masterViewResponseDoc);
    pvService.masterViewCallback();
}

pvService.masterViewCallback = function() {
    // implemented in MasterView
}

function initMasterViewRowsDataWithDoc(doc){
    pvService.masterViewRowsData = [];
	var approvals = doc.getElementsByTagName("approvals");
	for (var i = 0; i < approvals.length; i++) {
		var row = {};
		var theApproval = approvals.item(i);
		row['name'] = theApproval.getAttribute("personName");
		row['hours'] = parseInt(theApproval.getAttribute("detailCount"))/60 + " hours";
		row['location'] = pvService.locationOfApproval(theApproval, doc);
		row['dateRange'] = pvService.dateRangeOfApproval(theApproval, doc);
		row['dateRangeFormatted'] = pvService.formatDateRange(row['dateRange']);
		row['approval'] = theApproval;
        pvService.masterViewRowsData.push(row);
	}
    
    // for (var i = 0; i < pvService.masterViewRowsData.length; i++) {
		// Titanium.API.log("-----row.name--->" +pvService.masterViewRowsData[i]['name']);
		// Titanium.API.log("-----row.hours--->" +pvService.masterViewRowsData[i]['hours']);
		// Titanium.API.log("-----row.location--->" +pvService.masterViewRowsData[i]['location']);
		// Titanium.API.log("-----row.dateRange--->" +pvService.masterViewRowsData[i]['dateRange']);
		// Titanium.API.log("-----row.dateRangeFormatted--->" +pvService.masterViewRowsData[i]['dateRangeFormatted']);
	// }
}

pvService.getMasterViewRowsData = function() {
   return pvService.masterViewRowsData;
}


function formatStrDate(strDate){
	// strDate like format 2012-07-08-06:00
	
	var dateArray = strDate.split("-");
	var month = dateArray[1];
	month = month.charAt(0) == "0" ? month.charAt(1) : month;
	
	var day = dateArray[2];
	day = day.charAt(0) == "0" ? day.charAt(1) : day;
	
	var result = month +"/"+day;
	return result
}

pvService.dateRangeOfApproval = function(approval, doc) {
	var approvalIdentity = approval.getAttribute("identity");
	var aaprovalReportIdentity = pvService.approvalIdentityToReportIdentity(doc)[approvalIdentity];

	var timeReports = doc.getElementsByTagName("timeReports");
	for (var i = 0; i < timeReports.length; i++) {
		var theTimeReports = timeReports.item(i);
		var theReportIdentity = theTimeReports.getAttribute("identity");
		if (theReportIdentity == aaprovalReportIdentity) {
			return {
				"fromDate" : theTimeReports.getAttribute("fromDate"),
				"toDate" : theTimeReports.getAttribute("toDate")
			}
		}
	}
	return "";
}

pvService.dateRangeFormattedOfApproval = function(approval, doc) {
	var dateRange = pvService.dateRangeOfApproval(approval, doc);
	return pvService.formatDateRange(dateRange);
}

pvService.formatDateRange = function(dateRange){
	if (dateRange != "") {
		return formatStrDate(dateRange.fromDate) + " - " + formatStrDate(dateRange.toDate);
	}
	return "";
}

pvService.convertDateRangeToDateTextArray = function(dateRange){
	// return like ["Sun\nMar 6", "Mon\nMar 7", "Tue\nMar 8", "Wed\nMar 9", "Thu\nMar 10", "Fri\nMar 11", "Sat\nMar 12"];

	//dateRange.fromDate is String type firstly
	var fromDate = pvService.parseStringToDate(dateRange.fromDate);
	var toDate = pvService.parseStringToDate(dateRange.toDate);

	Titanium.API.log("-----fromDate--->" + fromDate);
	Titanium.API.log("-----toDate--->" + toDate);

	var fromTime = fromDate.getTime();
	var toTime = toDate.getTime();

	//Titanium.API.log("-----fromTime--->" + fromTime);
	//Titanium.API.log("-----toTime--->" + toTime);

	var result = [fromDate.format("ddd\nmmm d")];
	for (var loopTime = fromTime + 86400000; loopTime < toTime; loopTime += 86400000)//1000*60*60*24
	{
		var loopDay = new Date(loopTime);
		result.push(loopDay.format("ddd\nmmm d"));
	}
	result.push(toDate.format("ddd\nmmm d"));

	//Titanium.API.log("-----convertDateRangeToDateTextArray--->" + result);
	return result;

}

pvService.parseStringToDate = function(strDate){
	//strDate like format 2012-07-08-06:00
	var temp = strDate.split("-");
	
	var year = temp[0];
	var month = parseInt(temp[1]) - 1;
	var day = temp[2];
	
	var hourMinute = temp[3].split(":");
	var hour = hourMinute[0], minute = hourMinute[1];
	var seconds = 0, milliseconds = 0; 

	return new Date(year, month, day, hour, minute, seconds, milliseconds);
}



Array.prototype.contains = function(k) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === k) {
			return true;
		}
	}
	return false;
}



pvService.locationOfApproval = function(approval, doc){
	var locationArray = [];

	var approvalIdentity = approval.getAttribute("identity");
	var reportIdentity = pvService.approvalIdentityToReportIdentity(doc)[approvalIdentity];
	var timeSheetRowIdentityArray = pvService.reportIdentityToTimeSheetRowIdentityArray(doc)[reportIdentity];
	for (var i = 0; i < timeSheetRowIdentityArray.length; i++) {
		var theTimeSheetRowIdentity = timeSheetRowIdentityArray[i];
		var locationIdentity = pvService.timeSheetRowIdentityToLocationIdentity(doc)[theTimeSheetRowIdentity];
		var locationName = pvService.locationIdentityToLocationName()[locationIdentity];
		if (!locationArray.contains(locationName)) {
			locationArray.push(locationName)
		}
	}

	return locationArray.length == 0 ? "unknown" : locationArray.join("/");
	//----------------------------------

	/*
	 * for (NSUInteger p = 0; p < self.timeReports.count; p++) {
        PVTimeReport * report = [self.timeReports objectAtIndex:p];
        for (int r = report.timeSheetRowRefs.count-1; r >= 0; r--) {
            PVEntityReference * ref = [report.timeSheetRowRefs objectAtIndex:r];
            PVTimeSheetRow * row = [[PVPVAPIService service] entityForRef:ref];
            for (int c = row.timeSheetCells.count - 1; c >= 0; c--) {
                PVTimeSheetCell *cell = [row.timeSheetCells objectAtIndex:c];
                if ([cell.approvalStatus rangeOfString:@"SUBMITTED"].location == NSNotFound) {
                    [row.timeSheetCells removeObjectAtIndex:c];
                }
            }
            if (row.timeSheetCells.count == 0) {
                [report.timeSheetRowRefs removeObjectAtIndex:r];
                continue;
            }
        }
    }
	 */
	// var reportIdentity = approval.getElementsByTagName("reportRef").item(0).getAttribute("identity");
	// var timeReports = doc.getElementsByTagName("timeReports");
// 	
	// for (var i = 0; i < timeReports.length; i++) {
		// if(timeReports.getAttribute("identity") == reportIdentity){
			// var timeSheetRows = timeReports.getElementsByTagName("timeSheetRowRefs"); 
			// for (var j = 0; j < timeSheetRows.length; j++) {
				// var timeReports = doc.getElementsByTagName("timeReports");
				// timeSheetRows
// 				
			// }
		// }
		// var name = timeSheetRows.item(i).getAttribute("name");
		// var identity = locations.item(i).getAttribute("identity");
		// locationMap[identity] = name;
	// }
// 
// 	
	// Titanium.API.log("-----reportRef.getElementsByTagName--->" +approval.getElementsByTagName("reportRef"));
	// Titanium.API.log("-----reportRef.identity--->" +approval.getElementsByTagName("reportRef").item(0).getAttribute("identity"));
	//Titanium.API.log("-----test approvalIdentityToReportIdentity--->" +approvalIdentityToReportIdentity(doc)["0_1022092_25608"]);
	 // Titanium.API.log("-----test reportIdentityToTimeSheetRowIdentityArray--->" +reportIdentityToTimeSheetRowIdentityArray(doc)["0_405510_25607"]);
	// Titanium.API.log("-----test isTimeSheetRowValid--->" +isTimeSheetRowValid("0_1010923_25595", doc));
	//Titanium.API.log("-----test timeSheetRowIdentityToLocationIdentity--->" +timeSheetRowIdentityToLocationIdentity(doc)["0_1010923_25595"]);
	
}

var approvalIdentityToReportIdentityMap=null, reportIdentityToTimeSheetRowIdentityArrayMap=null, timeSheetRowIdentityToLocationIdentityMap=null;

pvService.approvalIdentityToReportIdentity = function(doc){
	if(approvalIdentityToReportIdentityMap!=null){
		return approvalIdentityToReportIdentityMap;
	}
	var map = {};
	var approvalList = doc.getElementsByTagName("approvals");
	for (var i = 0; i < approvalList.length; i++) {
		var theApproval = approvalList.item(i);
		var approvalIdentity = theApproval.getAttribute("identity");
		var ReportIdentity = theApproval.getElementsByTagName("reportRef").item(0).getAttribute("identity");
		map[approvalIdentity]=ReportIdentity;
	}
	return approvalIdentityToReportIdentityMap = map;
}


pvService.reportIdentityToTimeSheetRowIdentityArray = function(doc) {
	if(reportIdentityToTimeSheetRowIdentityArrayMap!=null){
		return reportIdentityToTimeSheetRowIdentityArrayMap;
	}
	var map = {};
	var timeReports = doc.getElementsByTagName("timeReports");
	for (var i = 0; i < timeReports.length; i++) {
		var theTimeReports = timeReports.item(i);
		var reportIdentity = theTimeReports.getAttribute("identity");

		var timeSheetRowIdentityArray = [];
		var timeSheetRowRefs = theTimeReports.getElementsByTagName("timeSheetRowRefs");
		for (var j = 0; j < timeSheetRowRefs.length; j++) {
			var timeSheetRowIdentity = timeSheetRowRefs.item(j).getAttribute("oid");
			if (pvService.isTimeSheetRowValid(timeSheetRowIdentity, doc)) {
				timeSheetRowIdentityArray.push(timeSheetRowIdentity);
			}
		}
		map[reportIdentity] = timeSheetRowIdentityArray;
	}

	return reportIdentityToTimeSheetRowIdentityArrayMap = map;
}

pvService.timeSheetRowIdentityToLocationIdentity = function(doc) {
	if(timeSheetRowIdentityToLocationIdentityMap!=null){
		return timeSheetRowIdentityToLocationIdentityMap;
	}
	
	var map = {};
    var timeSheetRows = doc.getElementsByTagName("timeSheetRows");
	for (var i = 0; i < timeSheetRows.length; i++) {
		var theTimeSheetRow = timeSheetRows.item(i);
		var theTimeSheetRowIdentity = theTimeSheetRow.getAttribute("identity")
		var theLocationIdentity = theTimeSheetRow.getElementsByTagName("locationRef").item(0).getAttribute("oid");
		map[theTimeSheetRowIdentity]=theLocationIdentity;
	}
	
	return timeSheetRowIdentityToLocationIdentityMap = map;
}

pvService.locationIdentityToLocationName = function() {
	return pvService.locationIdentyToName;
}

pvService.isTimeSheetRowValid = function(timeSheetRowIdentity, doc){
	var timeSheetRows = doc.getElementsByTagName("timeSheetRows");
	for (var i = 0; i < timeSheetRows.length; i++) {
		var theTimeSheetRow = timeSheetRows.item(i);
		if(theTimeSheetRow.getAttribute("identity") == timeSheetRowIdentity){
			var firstTimeSheetCell = theTimeSheetRow.getElementsByTagName("timeSheetCells").item(0);
			var approvalStatus = firstTimeSheetCell.getElementsByTagName("approvalStatus").item(0).text;
			return approvalStatus.indexOf("SUBMITTED") != -1
		}
	}
}

pvService.getMainViewSoap = function(){
	// var username = "vernon.stinebaker";
	// var token = "AuthInfo:baf8a9fc0cdb24431f08035858a0751c88839a8c75288f81f85a14de4465cd42360b70f9828ce16b4cc634d01f3a834f27a7085e9cf6ef642ddaeb33adc5a0f72ec76792aded4abd97ca89b471fb22c25b259bad5bcf48f7477d4013f983921abea35372c67890019cad6f71714a7e6d1396e7f3ddbc40cd170b3c49b508780127a7085e9cf6ef64176133cdb3fbbab3117de1aa19a771eeeb9e571e532281dcd4be2e61c7ac76bbd42e59c2c044118eaa06489eb37b58ef1c00e4aa2b97a5b53726577792f436e20e2fedeef315dc060c3ee20f3962b65937ba1474fdf311605aa4e9ea48b14501606cf6cc46c844ad1f08035858a0751c88839a8c75288f8131a0cc748446ecd61addbed56bd8780bbe8136e644d2b400ae2ff9ba42f5a53ca272ee281b82333db566634c7af5b21b224e591a64acfafaac6719494e3903d3305846dc171389ea36651f9afc31a4690b213d4e86c2be0a74dc52abd0b4fc8e776d53c554c36b929364c18acd95156986c7e20196bd78cee33370c9d3421dbc";
	// var userID = "0_2690_25053";
	

	var username =  "rita.chen";
	var token = "AuthInfo:baf8a9fc0cdb24431f08035858a0751c88839a8c75288f81f85a14de4465cd42360b70f9828ce16b4cc634d01f3a834f27a7085e9cf6ef642ddaeb33adc5a0f72ec76792aded4abd97ca89b471fb22c25b259bad5bcf48f7477d4013f983921abea35372c67890019cad6f71714a7e6d1396e7f3ddbc40cd170b3c49b508780127a7085e9cf6ef64176133cdb3fbbab3117de1aa19a771eeeb9e571e532281dcd4be2e61c7ac76bbd42e59c2c044118eaa06489eb37b58ef1c00e4aa2b97a5b53726577792f436e20e2fedeef315dc060c3ee20f3962b65937ba1474fdf311605aa4e9ea48b14501606cf6cc46c844ad1f08035858a0751c88839a8c75288f8131a0cc748446ecd61addbed56bd8780bbe8136e644d2b400ae2ff9ba42f5a53ca272ee281b82333db566634c7af5b21b224e591a64acfafaac6719494e3903d3305846dc171389ea36651f9afc31a4690b213d4e86c2be0a866e425ac4bb3164c28c497bbbc937ff5c39e8c69fed443c";
	var userID = "0_2820_25053";

	
	
	
	var result='';
	
	result+="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
        result+="<SOAP-ENV:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">"
        result+="<SOAP-ENV:Body>"
        result+="<cmd:projectionRequest version=\"9.0sp1b, Build 09\" username=\""
        result+=username
        result+="\"  "
        result+="password=\""
        result+=token
        result+="\" " 
        result+="xsi:type=\"ns1:ProjectionRequest\" includeInactive=\"true\" xmlns:cmd=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\" xmlns:oper=\"http://primavera.com/schemas/pvapi/PVOperational.xsd\" xmlns:ns1=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\">"
        result+="<approvalProjection filter=\"(approvalStatus = 2 OR approvalStatus = 16) and ( approver in identity on user)\" expandAll=\"false\" xsi:type=\"ns2:ApprovalProjectionSpecification\" expandTime=\"true\" expandExpense=\"false\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
        result+="<timeReportProjection filter=\"referenced by report on Approval\" expandAll=\"false\" xsi:type=\"ns2:TimeReportProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
        result+="<timeSheetRowProjection filter=\"timeReport in identity on TimeReport AND approvalUser in {"
        result+=userID
        result+="}\""
        result+=" expandAll=\"false\" xsi:type=\"ns2:TimeSheetRowProjectionSpecification\" expandCells=\"true\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"
        result+="<userProjection filter=\"identity in {"
        result+=userID
        result+="}\" xsi:type=\"ns2:UserProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"                  
        result+="</cmd:projectionRequest>"
        result+="</SOAP-ENV:Body>"
        result+="</SOAP-ENV:Envelope>"
        
   return result;
}

pvService.afterGetLocation = function(){
	Titanium.API.log('afterGetLocation!');
	pvService.getTimeReport(pvService.getTimeReportCallback);
}


//---------------------------------------------------below is service post code----------------------------------------------------------------------------------
pvService.postSoap = function(action, soap, callback){
	var client = Ti.Network.createHTTPClient();
	client.onload = callback;

	client.open('POST', 'https://stlpv1.perficient.com/axis2/services/PVAPIService', true);
	client.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
	client.setRequestHeader('SOAPAction', action);

	client.send(soap);
}

//---------------------------------------------------below is fetch location code----------------------------------------------------------------------------------
pvService.locationCallback = function(){
		var locationMap = {};
		var locations = this.responseXML.documentElement.getElementsByTagName("locations");
		for (var i = 0; i < locations.length; i++) {
			var name = locations.item(i).getAttribute("name");
			var identity = locations.item(i).getAttribute("identity");
			locationMap[identity] = name;
		}
		Titanium.API.log("test locationMap[0_11_25571] is Florida?-->" + locationMap["0_11_25571"]);
		Titanium.API.log("test locationMap[0_431_25571] is NonTravel?-->" + locationMap["0_431_25571"]);
		
		pvService.locationIdentyToName = locationMap;
		pvService.afterGetLocation();
}


pvService.getLocationSoap = function(){
		// var username = "vernon.stinebaker";
	// var token = "AuthInfo:baf8a9fc0cdb24431f08035858a0751c88839a8c75288f81f85a14de4465cd42360b70f9828ce16b4cc634d01f3a834f27a7085e9cf6ef642ddaeb33adc5a0f72ec76792aded4abd97ca89b471fb22c25b259bad5bcf48f7477d4013f983921abea35372c67890019cad6f71714a7e6d1396e7f3ddbc40cd170b3c49b508780127a7085e9cf6ef64176133cdb3fbbab3117de1aa19a771eeeb9e571e532281dcd4be2e61c7ac76bbd42e59c2c044118eaa06489eb37b58ef1c00e4aa2b97a5b53726577792f436e20e2fedeef315dc060c3ee20f3962b65937ba1474fdf311605aa4e9ea48b14501606cf6cc46c844ad1f08035858a0751c88839a8c75288f8131a0cc748446ecd61addbed56bd8780bbe8136e644d2b400ae2ff9ba42f5a53ca272ee281b82333db566634c7af5b21b224e591a64acfafaac6719494e3903d3305846dc171389ea36651f9afc31a4690b213d4e86c2be0a74dc52abd0b4fc8e776d53c554c36b929364c18acd95156986c7e20196bd78cee33370c9d3421dbc";
	// var userID = "0_2690_25053";
	

	var username =  "rita.chen";
	var token = "AuthInfo:baf8a9fc0cdb24431f08035858a0751c88839a8c75288f81f85a14de4465cd42360b70f9828ce16b4cc634d01f3a834f27a7085e9cf6ef642ddaeb33adc5a0f72ec76792aded4abd97ca89b471fb22c25b259bad5bcf48f7477d4013f983921abea35372c67890019cad6f71714a7e6d1396e7f3ddbc40cd170b3c49b508780127a7085e9cf6ef64176133cdb3fbbab3117de1aa19a771eeeb9e571e532281dcd4be2e61c7ac76bbd42e59c2c044118eaa06489eb37b58ef1c00e4aa2b97a5b53726577792f436e20e2fedeef315dc060c3ee20f3962b65937ba1474fdf311605aa4e9ea48b14501606cf6cc46c844ad1f08035858a0751c88839a8c75288f8131a0cc748446ecd61addbed56bd8780bbe8136e644d2b400ae2ff9ba42f5a53ca272ee281b82333db566634c7af5b21b224e591a64acfafaac6719494e3903d3305846dc171389ea36651f9afc31a4690b213d4e86c2be0a866e425ac4bb3164c28c497bbbc937ff5c39e8c69fed443c";
	var userID = "0_2820_25053";

	
	
	
	  var s='';
    
      s+="<?xml version=\"1.0\" encoding=\"utf-8\"?>"
                                s+="<SOAP-ENV:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">"
                                s+="<SOAP-ENV:Body>"
                                s+="<cmd:projectionRequest version=\"9.0sp1b, Build 09\" username=\""
                                
                                //service.username
                                s+=username
                                
                                s+="\"  "
                                s+="password=\""
                                
                                //service.token
                                s+=token
                                
                                s+="\" " 
                                s+="xsi:type=\"ns1:ProjectionRequest\" includeInactive=\"true\" xmlns:cmd=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\" xmlns:oper=\"http://primavera.com/schemas/pvapi/PVOperational.xsd\" xmlns:ns1=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\">"
                                s+="<locationProjection xsi:type=\"ns2:LocationProjectionSpecification\" xmlns:ns2=\"http://primavera.com/schemas/pvapi/PVCmd.xsd\"/>"                  
                                s+="</cmd:projectionRequest>"
                                s+="</SOAP-ENV:Body>"
                                s+="</SOAP-ENV:Envelope>"
                                                         
      return s
	
}



pvService.getLocationMap = function(callback) {
	pvService.postSoap('executeProjectionRequest', pvService.getLocationSoap(), callback);
}


