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
	townIndex:int,
	land:int
}*/
function expedition(req, res){
	data = req.body;
	console.log(data);
	try{
		verify(data,{"key":typeof(""),"townIndex":typeof(2),"land":typeof(1)});
	}catch(err){
		console.log(err)
		res.json({});
	}	
	
	db.findOne('users',{key:data.key}, (result)=>{		
		town = result.gameData.towns[data.townIndex];
		if (!town) {console.log("No towns for user",data.key); return;}
		
		//data.land = Math.min(Math.abs(data.land),1000);
		data.land = parseInt(data.land);
		if(!town['landqueue'])
			town['landqueue'] = data.land
		else
			town['landqueue'] += town.landqueue+data.land;
		
		town['landqueue'] = Math.min(Math.max(town['landqueue'],0),1000);
		
		var buildqueue =  {};
		buildqueue["gameData.towns."+town.id+".landqueue"] = town.landqueue;
		db.update('users',{key:data.key},{"$set":buildqueue},(result1)=> {	
			res.json({
				success:true,
				town:town
			});
		});
	});
		
}

module.exports={
	expedition:expedition
}