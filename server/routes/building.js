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
	town,
	building:{
		building:number built
	}
}*/
function build(req, res){
	data = req.body;
	try{
		verify(data,{"key":typeof(""),"townIndex":typeof(2),"building":typeof({})});
	}catch(err){
		console.log(err)
		res.json({});
	}	
	
	db.findOne('users',{key:data.key}, (result)=>{		
		town = result.gameData.towns[data.town];
		if (!town) {console.log("No towns for user",data.key); return;}
		var buildings = town.buildqueue;
		console.log(data,town,buildings);
		
		Object.keys(data.building).forEach(b => {
			console.log('key:',b, buildings,data.building[b]);
			if(!buildings[b]){
				buildings[b] = data.building[b];
			}else{
				buildings[b] += data.building[b];
			}
		});
		var buildqueue =  {};
		buildqueue["gameData.towns.$.buildqueue"] = buildings;
		console.log("buildque:",buildqueue);
		db.update('users',{key:data.key, "gameData.towns.$.id":data.townIndex},{"$set":buildqueue},()=> {
			res.json({success:true});
		});
	});
		
}

module.exports={
	build:build
}