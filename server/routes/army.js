/*{
	key,
	town,
	army:{
		building:number built
	}
}*/
function build(req, res){
	data = req.body;
	
	global.db.userSchema.findOne({key:data.key}, (err,result)=>{		
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
		town.buildqueue = army
		
		result.save().then(() => {
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