function sqlEscapeStr(str) {

	let regex = /:[\s\S]*"[\s\S]*[^'][']{1}[^',]*"/;//matches json object that needs to have an apostraphe escaped

	try { if (typeof str.match(regex)[0] != "undefined") { var replacement= str.match(regex); } }  
	catch (err) {console.log(err);console.log('sqlEscapeStr error, str and regex:');console.log([str,regex]); var replacement = undefined;}
	//if no replacement is found, none needs to be made so just return the string unchanged...
	try { 
		if (typeof replacement == "undefined") {
		
			//set boolean for recursive function to end after all occurences are taken care of
			styleAssembler.config.sqlEscaped = true;
			return str;
		} 
	} catch (err) { 
		//set boolean for recursive function to end after all occurences are taken care of
		styleAssembler.config.sqlEscaped = true;
		console.log(err); return str; 
	}

	//add an extra ' to escape the apostraphe for SQL insertion
	let escaped = replacement[0].replace(/'/g,"''");
	let new_str = str.replace(replacement[0], escaped); 
	
	//recursively fix all occurences
	//first check if there are more ' to escape
	try { if (typeof new_str.match(regex)[0] != "undefined") { ss.config.sqlEscaped =false; } }  
	catch (err) {console.log(err);console.log('sqlEscapeStr error, str and regex:');console.log([str,regex]); ss.config.sqlEscaped = true;}
	//if the string is not escaped, call function recursively with the new string
	//return new_str;
	if (styleAssembler.config.sqlEscaped != true) {return sqlEscapeStr(new_str);}
	else {return new_str;}
}