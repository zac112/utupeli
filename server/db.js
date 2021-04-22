//var mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const {Schema} = mongoose;
var fs = require('fs');

module.exports = (dbhost) => {
	mongoose.connect(dbhost, { useNewUrlParser: true })
	.catch(error => console.log(error));
	//var db = mongoose.createConnection(dbhost);
	var db = mongoose;
	db.connection.on('open', () => {console.log("we're in")})

const heroSchema = new Schema({
	level:Number
});
const townSchema = new Schema({
			coords:String,
			id:Number,
			buildings:{
				farm:Number,
				house:Number
				},
			buildqueue:{},
			land:Number,
			population:Number,
			gold:Number,
			food:Number
			});

const gameSchema = new Schema({
		hero:heroSchema,
		towns:[townSchema]
	});
	
const playerSchema = new Schema({
	userId:String,
	key:String,
	created:{type:Date, default:Date.now},
	verificationkey:String,
	verified:Boolean,
	name:String,
	gameData:gameSchema
});


function init(data){
	
	dbAddress  = data.dbhost;
	//mongoose.connect(dbAddress, {useNewUrlParser: true, useUnifiedTopology: true});
	//db = mongoose.connection
	//db.on('error', console.error.bind(console, 'connection error:'));
	//db.once('open', function() {
	//  console.log("We're in mongo!");
	//});
	/*mongo.connect(dbAddress, function(err, database){
		db = database;
	});*/
}

function close(){
	db.close();
}

function insert(table, value, callback){
	if (typeof value === 'array') insertMany(table, value, (result) => callback(result));
	else if (Object.keys(value).length > 0) insertOne(table, value, (result) => callback(result));
}

function insertOne(table, values, callback){
	//mongo.connect(dbAddress, function(err, db){
		var dbo = db.db('utupeli');
		dbo.collection(table).insertOne(values, function(err, result){
			if (err) throw err;
			callback(result);
			//db.close();
		});
	//});
}

function insertMany(table, values, callback){
	//mongo.connect(dbAddress, function(err, db){
		var dbo = db.db('utupeli');
		dbo.collection(table).insertOne(values, function(err, result){
			if (err) throw err;
			callback(result);
			//db.close();
		});
	//});
}


function find(table, query, callback, projection ={}){
	//var db = database;
	//mongo.connect(dbAddress, function(err, db){
		var dbo = db.db('utupeli');
		dbo.collection(table).find(query, {projection:projection}).toArray(function(err, result){
			if (err) throw err;
			callback(result);
			//db.close();
		});
	//});
}

function findOne(table, query, callback, projection ={}){
	find(table, query, (result) => callback(result[0]) , projection);	
}

function update(table, query, values, callback){
	//mongo.connect(dbAddress, function(err, db){
		db.db('utupeli').collection(table).updateOne(query, values, function(err, result){
			if (err) {console.trace();throw err;}
			callback(result);
			//db.close();
		});
	//});
}

return {
	init:init,
	close:close,
	find:find,
	findOne:findOne,
	update:update,
	insert:insert,
	gameSchema:db.model("Game",gameSchema),
	heroSchema:db.model("Hero",heroSchema),
	townSchema:db.model("Town",townSchema),
	userSchema:db.model("User",playerSchema)
}
/*
module.exports = {
	init:init,
	close:close,
	find:find,
	findOne:findOne,
	update:update,
	insert:insert,
	gameSchema:db.model("Game",gameSchema),
	heroSchema:db.model("Hero",heroSchema),
	townSchema:db.model("Town",townSchema),
	playerSchema:db.model("Player",playerSchema)
}
*/
}