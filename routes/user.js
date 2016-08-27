var pg = require("pg");

var user = {};
user.name="sujit";
user.id ="001";

exports.get = function(req,res){
	//res.json(user);
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
	  });
}