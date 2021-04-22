/*
endpoint /map/:size/:x/:y
returning grid size: size*2+1 centered at x,y

*/
function get(req,res){
	let centY = parseInt(req.params.y);
	let centX = parseInt(req.params.x);
	let size = parseInt(req.params.size);
	
	size = Math.min(Math.abs(size),10);
	let coords = []
	for (let x=-size; x < size+1; x++){
		for (let y=-size; y < size+1; y++){
			coords.push((x+centX)+","+(y+centY))
		}	
	}
	console.log("Searching:",coords)
	//db.find('world',{_id:{$in:coords}},result => {
	global.db.userSchema.find({"gameData.towns":{'$elemMatch':{'coords':{'$in':coords}}}},(err,result) => {
		console.log("Found world:", result);
		let response = {};
		result.forEach(player => {
			let towns = player.gameData.towns;
			towns.forEach(town => {
				if (coords.includes(town.coords))
					response[town.coords] = [...(response[town.coords] || []), player._id]
			});
		});
		res.json(response);
	})
}

module.exports = {
	get:get
}