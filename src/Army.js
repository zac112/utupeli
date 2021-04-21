import React from 'react';

import REST from './connection';
class Army extends React.Component{
	
	render(){
		var formdata = {amount:0};
		console.log(this.props);
		const Unit = (data) => {
			const purchase = (event) => {
				event.preventDefault();
				var type = data.type;
				var queue = {};
				queue[type] = formdata.amount;
				REST.post('armybuild',{
					key:this.props.userId,
					town:this.props.town.id,
					'army': queue
				},
				(result) => {
					if(!result['success']){
						console.log("Build failed.");
						return;
					}
					console.log("Build success");
					
					//Send data to server
					console.log(this.props);
					console.log("Bought "+formdata.amount+" "+data.type);
					/*var town = this.props.town;
					town['buildqueue'][data.type] = (town['buildqueue'][data.type]|0)+ formdata.amount;
					var towns = this.props.towns;
					towns[this.props.town.id] = town 
					var state = {
						'town':town,
						'towns':towns
						}
					
					this.props.statechange(state);*/
					this.props.updateTown(result['town']);
				});
				
				console.log("Bought "+formdata.amount+" "+data.type);
			};
			const valuechange = (amount) =>{
				
				formdata.amount=parseInt(amount.target.value.replace(/\D/g,"")) || 0;
				console.log(formdata, amount.target.value);
			}
			return(
			<div style={{width:"200px"}}>
			<form onSubmit={purchase}>
				<label>
					{data.name} (Max:{this.props.town.gold/data.cost})
					<input type="text"  onChange={valuechange} />
				</label>
				<input type="submit" value={this.props.translations.BUY} />
			</form>
			</div>);
		}
		var units =[<Unit key={0} name={this.props.translations.SCOUT} type="Scout" cost={10}/>];
		if (this.props.town.buildings.barracks && this.props.town.buildings.barracks > 0)
			units.push(<Unit key={1} name={this.props.translations.SOLDIER} type="Soldier" cost={10}/>);
		if (this.props.town.buildings.stables && this.props.town.buildings.stables > 0)
			units.push(<Unit key={2} name={this.props.translations.KNÍGHT} type="Knight" cost={10}/>);
		
		return(
		<div>
		{units.map(e => e)}
		</div>
		);
	}
}

export default Army;