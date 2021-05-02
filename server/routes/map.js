/*
endpoint /map/:size/:x/:y
returning grid size: size*2+1 centered at x,y

*/
function get(req,res){
	let centY,centX,size;
	try{
	centY = parseInt(req.params.y);
	centX = parseInt(req.params.x);
	size = parseInt(req.params.size);
	}catch(e){
		res.json({});
	}
	size = Math.min(Math.abs(size),10);
	let coords = []
	for (let x=-size; x < size+1; x++){
		for (let y=-size; y < size+1; y++){
			coords.push((x+centX)+","+(y+centY))
		}	
	}
	console.log("Searching:",coords)
	//if optimization is needed; cache the map state for each tick,
	global.db.userSchema.find({'$or':[
		{"gameData.towns.coords":{'$in':coords}},
		{"gameData.hero.coords":{'$in':coords}}
		]}
		,(err,result) => {
			console.log("Found world:", result);
			let response = {};
			result.forEach(player => {
				console.log(player);
				if (player.kingdom == 'road'){
					response['road'] = ""
				}else if (player.kingdom == 'enemy'){
					response['enemy'] = ""
				}else{
					let towns = player.gameData.towns;
					towns.forEach(town => {
						if (coords.includes(town.coords)){
							response[town.coords] = response[town.coords] || {}							
							response[town.coords]['towns'] = response[town.coords]['towns'] || []
							response[town.coords]['towns'] = [...response[town.coords]['towns'], player.kingdom]
						}
					});
					let hero = player.gameData.hero.coords;					
					if(coords.includes(hero)){
						response[hero] = response[hero] || {}
						response[hero]['heros'] = response[hero]['heros'] || []
						response[hero]['heros'] = [...response[hero]['heros'], player.kingdom]
					}
				}
			});
			
			res.json(response);
		});

}

module.exports = {
	get:get
}