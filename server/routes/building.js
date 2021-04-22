
/*{
	key,
	town,
	building:{
		building:number built
	}
}*/
function build(req, res){
	data = req.body;
	
	global.db.userSchema.findOne({key:data.key}, (err,result)=>{		
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
		town.buildqueue = buildings
		
		result.save().then(() => {
			res.json({
				success:true,
				town:town
			});});
	});
		
}

module.exports={
	build:build
}