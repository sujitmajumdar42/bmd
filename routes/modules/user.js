var dataService = require("../db/DataService");

exports.get = function(req,res){
	/* 
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	    client.query('SELECT * FROM user_details', function(err, result) {
	    done();	
	      if (err)
	       { 
	    	  console.error(err); 
	    	  res.json(err); 
	    	}
	      else
	       { 
	    	  res.json(result.rows); 
	       }
	    });
	  });*/
	dataService.execQuery('SELECT userid FROM user_details',function(response){
		res.json(response);
	},function(err){
		res.json(err);
	});
	
}