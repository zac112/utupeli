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
	army:{
		building:number built
	}
}*/
function build(req, res){
	data = req.body;
	try{
		verify(data,{"key":typeof(""),"townIndex":typeof(2),"army":typeof({})});
	}catch(err){
		console.log(err)
		res.json({});
	}	
	
	db.findOne('users',{key:data.key}, (result)=>{		
		town = result.gameData.towns[data.town];
		if (!town) {console.log("No towns for user",data.key); return;}
		var army = town.armyqueue;
		console.log(data,town,army);
		
		Object.keys(data.army).forEach(b => {
			console.log('key:',b, army,data.army[b]);
			if(!army[b]){
				army[b] = data.army[b];
			}else{
				army[b] += data.army[b];
			}
		});
		var buildqueue =  {};
		buildqueue["gameData.towns.$.armyqueue"] = army;
		town.buildqueue = army
		
		db.update('users',{key:data.key, "gameData.towns.$.id":data.townIndex},{"$set":buildqueue},()=> {
			res.json({
				success:true,
				town:town
			});
		});
	});
		
}

module.exports={
	build:build
}