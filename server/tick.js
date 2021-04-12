var db = require('./db.js');

function armyQueueTick(conn, player){
	//Finish army units from queue
}

function buildQueueTick(conn, player){
	const buildingCost = (num) => (num*10-100);
	
	player = player.gameData;
	player.towns.forEach(town => {
		if (Object.keys(town.buildqueue).length == 0) return;
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

function calculateGoldTick(conn, player){
	player = player.gameData;
	player.towns.forEach(town => {
		town.gold += (town.buildings.goldmine || 0)*10;
	});
}

function calculateFoodTick(conn, player){
	player = player.gameData;
	player.towns.forEach(town => {
		town.food += (town.buildings.farm || 0)*10;
	});
}

function tick(){	
	var start = new Date();
	console.log("Tick started at",start.toLocaleString());
	
	tickfuncs = [calculateFoodTick, calculateGoldTick, armyQueueTick, buildQueueTick]
	db.find('users',{},(res)=>{		
		res.forEach(player => {
			console.log("Player before",player);
			tickfuncs.forEach(e => e(db, player))	
			db.update('users',{key:player.key}, {"$set":player}, res => {});
			console.log("Player after",player);
		});		
	});
	
	var end = new Date();
	console.log("Tick finished at",end.toLocaleString(),"in",(end.getTime()-start.getTime()),"ms");
}

//const tickInterval = 10*60*1000;
const tickInterval = 1*60*1000;

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