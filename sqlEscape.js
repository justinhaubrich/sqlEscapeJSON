//Need to escape apostraphes in string values of the json object being inserted into the database (' => '')
function sqlEscapeStr(str) {

		//get rid of to many apostraphes (never should be more than '')
		var str = str.split(/'{3,}/g).join("''").split(/(?<!')'(?!')/g).join("''");
		return str;
}
