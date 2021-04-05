import React from 'react';

class Buildings extends React.Component{
	
	render(){
		var formdata = {amount : 0};
		const Building = (data) => {
			const purchase = (event) => {
				event.preventDefault();
				//Send data to server
				console.log(this.props);
				console.log("Bought "+formdata.amount+" "+data.type);
				var state = {...this.props.town}
				state['buildings'][data.type] += formdata.amount
				this.props.statechange(state);
			};
			const valuechange = (amount) =>{
				
				formdata.amount=parseInt(amount.target.value.replace(/\D/g,"")) || 0;
				console.log(formdata, amount.target.value);
			}
			var owned = this.props.town.buildings[data.type] || 0;
			return(
			<div style={{width:"200px"}}>
			<form onSubmit={purchase}>
				<label>
				{owned} {data.name} (Max:{this.props.town.gold/data.cost})
					<input type="text"  onChange={valuechange} />
				</label>
				<input type="submit" value={this.props.translations.BUY} />
			</form>
			</div>);
		}
		return(
		<div style={{height:'100%', display:'flex', alignItems: 'flex-start', flexFlow: 'row wrap'}}>
		<Building name={this.props.translations.FARM} type="farm" cost={10}/>
		<Building name={this.props.translations.ARMORY} type="armory" cost={10}/>
		<Building name={this.props.translations.BARRACKS} type="barracks" cost={10}/>
		<Building name={this.props.translations.STABLES} type="stables" cost={10}/>
		<Building name={this.props.translations.HOUSE} type="house" cost={10}/>
		<Building name={this.props.translations.GOLDMINE} type="goldmine" cost={10}/>
		<Building name={this.props.translations.LIBRARY} type="library" cost={10}/>
				
		</div>
		)
	}
}

export default Buildings;