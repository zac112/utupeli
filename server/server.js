var express = require('express');
var mongo = require('mongodb').MongoClient;
var app = express();
var port=3001;
var address="localhost";

app.get("/page/:id",function(request, response){
    var id = request.params.id;
    // do something with id
    // send a response to user based on id
    var obj = { id : id, Content : "content " +id };

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(obj));
});

app.listen(port, address, () =>{
	console.log("Server running at "+address+":"+port);
})