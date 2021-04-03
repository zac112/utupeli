var mongo = require('mongodb').MongoClient;
var nodemailer = require('nodemailer');
const crypto = require('crypto');
var dbAddress, mongo;
var gmailSecret;
var production;

function init(data){
	dbAddress  = data.dbhost;
	gmailSecret = data.gmailSecret;
	production = data.production || false;
}

/*body
{
	key:string
}
res
{
	[player:{playerdata}]
}*/
function login(req, res){	
	mongo.connect(dbAddress, function(err, db){
		console.log("Req:",req.body);
		var dbo = db.db('utupeli');
		dbo.collection('users').findOne({key:req.body.key}, function(err, result){
			if (err) throw err;
			console.log(result);
			if(result == null){
				res.json({});
			}else{
				if(!result.verified) res.json({});
				else res.json(result);
			}
			db.close();
		});
	});
}

/*body
{
	id:string
}
res
{
	key:string
}*/
function createAccount(req, res){
	mongo.connect(dbAddress, function(err, db){
		console.log("Req:",req.body);
		
		db.db('utupeli').collection('users').findOne({id:req.body.id}, function(err, result){
			if (err) throw err;
			console.log("found player",result);
			if (result == null){
				let key = crypto.createHash('md5').update(new Date().toString()).digest('hex');
				let verificationkey = 100000-parseInt(Math.random()*10000);
				var startingPlayer = {
					id:req.body.id,
					key:key,
					created:new Date(),
					verificationkey:verificationkey,
					verified:false,
					farms:10,
					land:10,
					population:10,
					gold:100,
					food:100
				};
				db.db('utupeli').collection('users').insertOne(startingPlayer, function(err, result){
					if (err) throw err;					
					console.log("Player created:",new Date()," - ",req.body.id," key:",key," verificationkey:",verificationkey);
					db.close();					
					
					var address = "https://ville-mobile.utu.fi/utupeli/verifyAccount/"+req.body.id+"/"+key;
					var transporter = nodemailer.createTransport({
					  service: 'gmail',
					  auth: {
						user: 'elokkila@gmail.com',
						pass: gmailSecret
					  }
					});
					if(production){
						let info = transporter.sendMail({
							from: '"Erno Lokkila" <eolokk@utu.fi>', // sender address
							to: "eolokk@utu.fi", // list of receivers
							subject: "Rekisteröitymislinkkisi", // Subject line
							text: "English version below.\nMoi.\n\nKopioi seuraava linkki selaimeesi ja saat avaimen, jolla voit kirjautua kaupunkiisi. "+address+".\n\nHi\n\nCopy the following link to your browser to receive your key, which you can use to log on to your city! "+address+"\n\n-Erno", // plain text body
						});
						res.json({success:true});
					}else{
						res.send(address);
					}
				};
			}else if (!result.verified){
				db.close();
				res.json({success:true});
			}else{
				db.close();	
				res.json({});	
			}
			
			
		});

	});
};

function verifyAccountKey(req, res){
	let user = req.params.user;
	let key = req.params.key;
	mongo.connect(dbAddress, function(err, db){
		console.log("Req:",req.params);
		
		let query = {
			verificationkey:parseInt(key),
			id:user};
		db.db('utupeli').collection('users').findOne(query, function(err, userData){
			if (err) throw err;
			console.log(userData);
			if(!userData){
				res.send("Nothing to verify");
			}else{				
				let values = {$set: {verified:true}};
				db.db('utupeli').collection('users').updateOne(query, values, function(err, result){
					if (err) throw err;
					if(result.result.nModified == 1){
						res.send("Verified. Use the following key to log in and start playing! "+userData.key);
						console.log("Player verified:",user);						
					}else{
						res.send("Use the following key to log in and start playing! "+userData.key);
					}
					db.close();
				});
				
			}			
			db.close();
		});
	});
	
}
module.exports = {
	init:init,
	login:login,
	createAccount:createAccount,
	verifyAccountKey:verifyAccountKey
};