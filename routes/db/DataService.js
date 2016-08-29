const Pool = require('pg-pool');
const url = require('url');
var nconf = require('nconf');

nconf.file('QUERY','./routes/db/db_query.json');
nconf.file('DB','./config.json');

const pool = new Pool(nconf.get('mysql:DEV'));

exports.execQuery = function(query,params,onSuccess,onFail){
	pool.connect(function(err, client, done) {
		if(err) {
			console.error("DB ERROR");
			console.error(err);
			onFail(err);
		} else{
			 client.query(query,params, function(err, result) {
				 done();
				 if(err) {
					 console.error("QUERY ERROR");
					 console.error(err);
					 onFail(err);
				 } else{
					 onSuccess(result.rows);
				 }  
			 });
		}
	});
}

pool.on('error', function (err, client) {
	console.error('idle client error', err.message, err.stack);
})