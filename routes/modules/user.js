var dataService = require("../db/DataService");
var userQueryConf = require('nconf'); 

exports.get = function(req,res){
	dataService.execQuery(userQueryConf.use('QUERY').get("USER_DETAILS:FETCH_ALL"),[],function(response){
		res.json(response);
	},function(err){
		res.json(err);
	});
	
}