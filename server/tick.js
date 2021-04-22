var db = global['db'];//require('./db.js');

function armyQueueTick(player){
	//Finish army units from queue
}

function landQueueTick(player){
	const landCost = (num) => (num*10-100);
	player.towns.forEach(town => {
		console.log("S",town)
		if(town.landqueue > 0 && town.gold > landCost(town.land + 1)){						
			town.land += 1;
			town.landqueue -= 1;
			console.log("OK",town)
		}
	});
}

function buildQueueTick(player){
	const buildingCost = (num) => (num*10-100);
	
	player.towns.forEach(town => {
		if (!town.buildqueue || Object.keys(town.buildqueue).length == 0) return;
		var numOfBuildings = Object.values(town.buildings).recude((total, num) => total+num,0);
		if(town.gold > getBuildingCost(numOfBuildings+1 && town.land > 0)){
			var keys = Object.keys(town.buildqueue)
				.map((a) => ({sort: Math.random(), value: a}))
				.sort((a, b) => a.sort - b.sort)
				.map((a) => a.value);
			var key = keys.pop();
			town.buildqueue[key] -= 1;
			if (!town.buildings[key])
				town.buildings[key] = 1;
			else{
				town.buildings[key] += 1;
			}
			if (town.buildqueue[key] <= 0)
				delete town.buildqueue[key];
			town.land -= 1;
		}		
	});
	
}

function calculateGoldTick(player){
	player.towns.forEach(town => {
		town.gold += (town.buildings.goldmine || 0)*10;
	});
}

function calculateFoodTick(player){
	console.log("food",player)
	player.towns.forEach(town => {
		town.food += (town.buildings.farm || 0)*10;
	});
}

function tick(){	
	var start = new Date();
	var db = global.db;
	console.log("Tick started at",start.toLocaleString());
	
	tickfuncs = [calculateFoodTick, calculateGoldTick, armyQueueTick, buildQueueTick, landQueueTick]
	
	db.userSchema.find({}, (err, res) => {
		if (err) console.log(err);
		console.log(res)
		res.forEach(player => {
			console.log("Player before",player);
			tickfuncs.forEach(e => e(player.gameData))	
			player.save();
			console.log("Player after",player);
		});
	})
	/*db.find('users',{},(res)=>{		
		res.forEach(player => {
			console.log("Player before",player);
			tickfuncs.forEach(e => e(db, player))	
			db.update('users',{key:player.key}, {"$set":player}, res => {});
			console.log("Player after",player);
		});		
	});*/
	
	var end = new Date();
	console.log("Tick finished at",end.toLocaleString(),"in",(end.getTime()-start.getTime()),"ms");
}

//const tickInterval = 10*60*1000;
const tickInterval = 1*10*1000;

function nextTick(){
	var t = tickInterval/60/1000;
	var d = new Date();
	d.setSeconds(0);
	d.setMinutes(parseInt(d.getMinutes()/t+1)*t);
	return d;
}

module.exports = {
	tick:tick,
	nextTick:nextTick,
	tickInterval:tickInterval
}