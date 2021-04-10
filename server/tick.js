var db = require('./db.js');

function armyQueueTick(conn, player){
	//Finish army units from queue
}

function buildQueueTick(conn, player){
	player = player.gameData;
	player.towns.forEach(town => {
		console.log("Player town before",town);
		if (Object.keys(town.buildqueue).length == 0) return;
		var index = parseInt(Math.random()*Object.keys(town.buildqueue).length)
		var key = Object.keys(town.buildqueue)[index];
		town.buildqueue[key] -= 1;
		if (!town.buildings[key])
			town.buildings[key] = 1;
		else{
			town.buildings[key] += 1;
		}
		if (town.buildqueue[key] <= 0)
			delete town.buildqueue[key];
		
		console.log("Player town after",town);
	});
	
	
	//Finish a building from queue
}

function calculateGoldTick(conn, player){
	//update player's gold for each town
}

function calculateFoodTick(conn, player){
	//update player's food for each town
}

function tick(){	
	var start = new Date();
	console.log("Tick started at",start.toLocaleString());
	
	tickfuncs = [calculateFoodTick, calculateGoldTick, armyQueueTick, buildQueueTick]
	db.find('users',{},(res)=>{		
		res.forEach(player => {
			tickfuncs.forEach(e => e(db, player))	
			db.update('users',{key:player.key}, {"$set":player}, res => {
				console.log("Player updated",player);
			});
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