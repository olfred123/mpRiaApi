// lib
var ria = require('./lib/ria.js');
var fs = require('fs');

// vars
var KEY_FILE = 'session.key';
var ENCODING = 'utf8';

// instance de ZIS - works from within Zetcom network
// ria.setCreditentials('RDW', 'RDW');
// ria.setInstanceUrl('https://mp-ria-14.zetcom.com/MpWeb-ZetcomZis');

// instance de test - works from any internet connection
ria.setCreditentials('SuperAdmin', 'SuperAdmin');
ria.setInstanceUrl('https://mp-ria-15.zetcom.com/MpWeb-apParisPuig');

// login if required
fs.readFile(KEY_FILE, ENCODING, function(err, data){
	if (err) {
		console.time('login');
		ria._login(function(){ 
			console.timeEnd('login');
			// try to reuse session to avoid re-login on every request
			// on login, save the key to the file
			fs.writeFile(KEY_FILE, ria.getSessionKey(), ENCODING, null);
			console.log("SAVE KEY " + ria.getSessionKey())
			// ria.deleteSession(runMyTests); // test delete session
			runMyTests();
		});
	} else {
		// retrieved key can be wrong or not valid anymore
		ria.setSessionKey(data);
		console.log("RETRIEVED KEY " + ria.getSessionKey())

		// ria.deleteSession(runMyTests); // test delete session
		runMyTests();
	}

});


function runMyTests() {

	// ************************************************************************
	// * Standard function tests 
	// ************************************************************************
	
	//ria.getModuleDefinition('Multimedia', callback);
	// ria.getModuleDefinition('Object', callback);
	
	//ria.getAllModuleDefinition(callback);
	
	//ria.getModuleItem('Multimedia', '446', callback); // TODO not working
	//ria.getModuleItem('Multimedia', 'MulAltimaCreationdate0043Txt', callback); // TODO not working
	//ria.getModuleItem('Multimedia', 84, callback); // TODO not working, ID? How to find them? With the search :)
	// ria.getModuleItem('Object', '65', callback); 

	//ria.getModuleOrgunits('Multimedia', callback); // OK

	/*
	<repeatableGroup name="MulLine0043Grp">
		<repeatableGroupItem>
			<vocabularyReference name="LineVoc" id="425" />
		</repeatableGroupItem>
	</repeatableGroup>
    */
	// ria.getVocabularyGroup('425', callback); // OK 50% : returned XML seems INVALID ?
	// ria.getVocabularyGroup('397', callback);
	// ria.getVocabularyGroup(373, callback); // OK
	
	// ria.getVocabulary('3676', callback); // OK
	// ria.getVocabulary(3139, callback); // OK

	// Body definition : http://www.zetcom.com/ria/ws/module/search/search.xml 
	// OK!
	// ria.postModuleSearch('Multimedia', '<application xmlns="http://www.zetcom.com/ria/ws/module/search" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.zetcom.com/ria/ws/module/search http://www.zetcom.com/ria/ws/module/search/search_1_0.xsd"><modules><module name="Multimedia"><search><fulltext>*</fulltext></search></module></modules></application>', callback); 



	// ************************************************************************
	// * Custom function tests 
	// ************************************************************************
	console.time('runMyTests');
	ria.getModuleListAsJson(callback)



	// Complete test
	//ria.getModuleItem('Object', '65', callback); 
	//ria.getAllObjectFromModule('Object', callback, 'json');
}




function callback(err, data) {
	console.timeEnd('runMyTests');
	console.dir('error: ' + err);
	console.log("Data: %j", data); // show all json format

}

