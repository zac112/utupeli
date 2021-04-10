var mongo = require('mongodb').MongoClient;
var dbAddress;

function init(data){
	dbAddress  = data.dbhost;
}
function insert(table, value, callback){
	if (typeof value === 'array') insertMany(table, value, (result) => callback(result));
	else if (Object.keys(value).length > 0) insertOne(table, value, (result) => callback(result));
}

function insertOne(table, values, callback){
	mongo.connect(dbAddress, function(err, db){
		var dbo = db.db('utupeli');
		dbo.collection(table).insertOne(values, function(err, result){
			if (err) throw err;
			callback(result);
			db.close();
		});
	});
}

function insertMany(table, values, callback){
	mongo.connect(dbAddress, function(err, db){
		var dbo = db.db('utupeli');
		dbo.collection(table).insertOne(values, function(err, result){
			if (err) throw err;
			callback(result);
			db.close();
		});
	});
}


function find(table, query, callback, projection ={}){
	mongo.connect(dbAddress, function(err, db){
		var dbo = db.db('utupeli');
		dbo.collection(table).find(query, {projection:projection}).toArray(function(err, result){
			if (err) throw err;
			callback(result);
			db.close();
		});
	});
}

function findOne(table, query, callback, projection ={}){
	find(table, query, (result) => callback(result[0]) , projection);	
}

function update(table, query, values, callback){
	mongo.connect(dbAddress, function(err, db){
		db.db('utupeli').collection(table).updateOne(query, values, function(err, result){
			if (err) {console.trace();throw err;}
			callback(result);
			db.close();
		});
	});
}

module.exports = {
	init:init,
	find:find,
	findOne:findOne,
	update:update,
	insert:insert
}
