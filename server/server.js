var mongo = require('mongodb').MongoClient;	
var fs = require('fs');
var cors = require('cors');
var express = require('express');
var app = express();
var port=3001;
var address="localhost";
var dbAddress=undefined;
var db=require('./db');
var gmailSecret = undefined;
var login = require('./routes/login');

fs.readFile('settings.json', 'utf8', function(err, data) {
	if (err) throw err;
	var data = JSON.parse(data);
	port = data.serverport;		 
	data['dbconnection'] = mongo.connect(data.dbhost);
	db.init(data);
	login.init(data);
});
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());


app.post("/createAccount", login.createAccount);
app.post("/login", login.login);
app.get("/verifyAccount/:user/:key", login.verifyAccountKey);


try{
var server = app.listen(port, address, () =>{
	console.log("Server running at "+address+":"+port);
});
}catch(err){
	console.log(err);
	shutDown();
}
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);	
};
