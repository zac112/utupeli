var db = require('./db.js');

function armyQueueTick(player){
	//Finish army units from queue
}

function buildQueueTick(player){
	//Finish a building from queue
}

function calculateGoldTick(player){
	//update player's gold for each town
}

function calculateFoodTick(player){
	//update player's food for each town
}

function tick(){	
	tickfuncs = [calculateFoodTick, calculateGoldTick, armyQueueTick, buildQueueTick]
	db.find('users',{},(res)=>{		
		res.forEach(player => {
			console.log("tick for player",player);
			tickfuncs.forEach(e => e(player))	
		});		
	});
	
	
}

function buildEvent(event){
	//chekc who built and add to queue
}

module.exports = {
	tick:tick,
	buildEvent:buildEvent
}