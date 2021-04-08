var db = require ('../db');

function verify(model, data){
	for(var k in Object.keys(model)){
		if ( !(typeof data[k] === typeof model[k])){
			console.log("Keys in data",Object.keys(data),"didn't match model",Object.keys(model));
			return false;
		}
	}
}
/*{
	key,
	townIndex,
	buildings:{
		building:number built
	}
}*/
function build(req, res){
	data = req.body;
	try{
		verify(data,{"key":typeof(""),"townIndex":typeof(2),"buildings":typeof({})});
	}catch(err){
		console.log(err)
		res.json({});
	}	
	
	db.insertOne('actions',{
		'key':data['key'], 
		'townIndex':data['townIndex'], 
		'buildings':data['buildings'],
		'finish':Date.now()+10*60*1000}, (result) => {
		console.log("Inserted event",data);
	});
	
}

module.exports={
	build:build
}