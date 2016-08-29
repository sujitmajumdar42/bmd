const Pool = require('pg-pool');
const url = require('url')

var CONFIG_DEV = {
  host: 'ec2-54-235-126-62.compute-1.amazonaws.com',
  user: 'ctgtneynkjujkc', //env var: PGUSER 
  database: 'd7r2431hhuj925', //env var: PGDATABASE 
  password: 'rWYnpSPsp4boQB3zPLUAAiyZtv', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 100, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
  ssl: true
};

//var pool = new pg.Pool(config);
/*const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

var CONFIG_PROD = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};*/

const pool = new Pool(CONFIG_DEV);

exports.execQuery = function(query,onSuccess,onFail){
	pool.connect(function(err, client, done) {
		if(err) {
			console.error("DB ERROR");
			console.error(err);
			onFail(err);
		} else{
			 client.query(query, function(err, result) {
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


/*pool.connect(function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
	    //call `done()` to release the client back to the pool 
	    done();
	 
	    if(err) {
	      return console.error('error running query', err);
	    }
	    console.log(result.rows[0].number);
	    //output: 1 
	  });
	});*/

pool.on('error', function (err, client) {
	  // if an error is encountered by a client while it sits idle in the pool 
	  // the pool itself will emit an error event with both the error and 
	  // the client which emitted the original error 
	  // this is a rare occurrence but can happen if there is a network partition 
	  // between your application and the database, the database restarts, etc. 
	  // and so you might want to handle it and at least log it out 
	  console.error('idle client error', err.message, err.stack)
	})