
/*{
	key,
	townIndex:int,
	land:int
}*/
function expedition(req, res){
	data = req.body;
	console.log(data);
	
	global.db.userSchema.findOne({key:data.key}, (err, result)=>{		
		town = result.gameData.towns[data.townIndex];
		if (!town) {console.log("No towns for user",data.key); return;}
		
		//data.land = Math.min(Math.abs(data.land),1000);
		data.land = parseInt(data.land);
		if(!town['landqueue'])
			town['landqueue'] = data.land
		else
			town['landqueue'] += town.landqueue+data.land;
		
		town['landqueue'] = Math.min(Math.max(town['landqueue'],0),1000);
				
		result.save().then(() => {
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