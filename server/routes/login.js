var nodemailer = require('nodemailer');
const crypto = require('crypto');
var db = require('../db');
var gmailSecret;
var production;

function init(data){
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
console.log("login 21 trying to login:",req.body);
	global.db.userSchema.findOne({key:req.body.key}, (err,result) => {
		if(result == null){
			res.json({});
		}else{
			console.log("login 25: logged in",result,result['verified'], (typeof result['verified']));
			
			if(result['verified']) res.json({'player':result['gameData'], 'name':result['kingdom']});
			else res.json({});
		}
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
	var db = global.db;
	let userId = crypto.createHash('sha256').update(req.body.id).digest('hex');
	let key = crypto.createHash('md5').update(new Date().toString()).digest('hex');
	let verificationkey = 100000-parseInt(Math.random()*10000);
	var address = "https://ville-mobile.utu.fi/utupeli/verifyAccount/"+userId+"/"+verificationkey;
	
	db.userSchema.findById(userId, (err,player) => {
		if(player == undefined){
			var startingPlayer = new db.userSchema({
				userId:userId,
				key:key,
				created:new Date(),
				verificationkey:verificationkey,
				verified:false,
				gameData:{
					hero:{						
					},
					towns:[{
						coords:"0,0",
						id:0,
						buildings:{
							farm:5,
							house:5
							},
						buildqueue:{},
						land:10,
						population:10,
						gold:100,
						food:100
						}]
				}
			});
			startingPlayer.save((err, result)=>{
				if (err) console.log(err);
				console.log("Player created:",new Date()," - ",req.body.id," key:",key," verificationkey:",verificationkey);
				
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
					res.json({success:true, dev:address});
				}
			});
		}else if (!result.verified){
			if(production)
				res.json({success:true});
			else
				res.json({success:true, dev:address});
		}else{
			res.json({});	
		}	
	});
	
};

/**
endpoint: /:user/:key
**/
function verifyAccountKey(req, res){
	let user = req.params.user;
	let key = req.params.key;
	
	let query = {
		verificationkey:parseInt(key),
		userId:user};
			
	global.db.userSchema.findOne(query, (err,userData) => {
		console.log(userData);
		if(!userData){
			res.send("Nothing to verify");
		}else{
			
			if(userData.verified){
				res.send("Use the following key to log in and start playing! "+userData.key);
			}else{
				userData.verified = true;
				userData.save();
				res.send("Verified. Use the following key to log in and start playing! "+userData.key);
				console.log("Player verified:",user);	
			}
			
							
		}			
	});	
}

module.exports = {
	init:init,
	login:login,
	createAccount:createAccount,
	verifyAccountKey:verifyAccountKey
};