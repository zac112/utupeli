var fs = require('fs');
var cors = require('cors');
var express = require('express');
var app = express();
var port=3001;
var address="localhost";
var dbAddress=undefined;
var db=require('./db');
var mongoose = require('mongoose');	
var gmailSecret = undefined;
var login = require('./routes/login');
var tick = require('./tick');
var building = require('./routes/building');
var map = require('./routes/map');
var town = require('./routes/town');

fs.readFile('settings.json', 'utf8', function(err, data) {
	if (err) throw err;
	var data = JSON.parse(data);
	port = data.serverport;		 
	//data['dbconnection'] = mongo.connect(data.dbhost);
	console.log(db);
	db.init(data);
	login.init(data);
	mongoose.connect(data.dbhost);
});
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());


app.post("/createAccount", login.createAccount);
app.post("/login", login.login);
app.get("/verifyAccount/:user/:key", login.verifyAccountKey);

app.get("/tick", (req, res) => res.json({time:tick.nextTick().getTime()}));

app.post("/build",building.build);

app.post('/expedition', town.expedition);

app.get('/map/:size/:x/:y',map.get);

app.get("/player/:id", (req, res) => {
	db.findOne('users',{key:req.params.id}, player => {
		res.json({'player':player.gameData, 'success':true});
		});
	});

try{
	
	var server = app.listen(port, address, () =>{
		console.log("Server running at "+address+":"+port);
		
		var d = tick.nextTick();
		console.log("First tick at ",d.toLocaleString(),"in",d-new Date(),"ms");
		setTimeout(() => {
			tick.tick();
			setInterval(tick.tick, tick.tickInterval);
			}, d-Date.now());
	});
}catch(err){
	console.log(err);
	shutDown();
}
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
	db.close();
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 2000);	
};
