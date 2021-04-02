import React from 'react';

class Army extends React.Component{
	
	render(){
		var formdata = {amount:0};
		console.log(this.props);
		const Unit = (data) => {
			const purchase = (event) => {
				event.preventDefault();
				//Send data to server
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
					{data.name} (Max:{this.props.gold/data.cost})
					<input type="text"  onChange={valuechange} />
				</label>
				<input type="submit" value={this.props.translations.BUY} />
			</form>
			</div>);
		}
		var units =[<Unit key={0} name={this.props.translations.SCOUT} type="Scout" cost={10}/>];
		if (this.props.buildings.barracks > 0)
			units.push(<Unit key={1} name={this.props.translations.SOLDIER} type="Soldier" cost={10}/>);
		if (this.props.buildings.stables > 0)
			units.push(<Unit key={2} name={this.props.translations.KNÍGHT} type="Knight" cost={10}/>);
		
		return(
		<div>
		{units.map(e => e)}
		</div>
		);
	}
}

export default Army;