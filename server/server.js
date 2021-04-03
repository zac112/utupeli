var fs = require('fs');
var cors = require('cors');
var express = require('express');
var app = express();
var port=3001;
var address="localhost";
var dbAddress=undefined;
var db=undefined;
var gmailSecret = undefined;
var login = require('./routes/login');

fs.readFile('settings.json', 'utf8', function(err, data) {
	if (err) throw err;
	var data = JSON.parse(data);
	port = data.serverport;	
	//mongodb = mongo.connect(data.dbhost);
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

app.get("/page/:id",function(request, response){
    var id = request.params.id;
    // do something with id
    // send a response to user based on id
    var obj = { id : id, Content : "content " +id };

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(obj));
});

var server = app.listen(port, address, () =>{
	console.log("Server running at "+address+":"+port);
});
	
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
