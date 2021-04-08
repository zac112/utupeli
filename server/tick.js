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
	var start = new Date();
	console.log("Tick started at",start.toLocaleString());
	
	tickfuncs = [calculateFoodTick, calculateGoldTick, armyQueueTick, buildQueueTick]
	db.find('users',{},(res)=>{		
		res.forEach(player => {
			tickfuncs.forEach(e => e(player))	
		});		
	});
	
	var end = new Date();
	console.log("Tick finished at",end.toLocaleString(),"in",(end.getTime()-start.getTime()),"ms");
}

const tickInterval = 10*60*1000;

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