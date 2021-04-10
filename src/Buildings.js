import React from 'react';
import REST from './connection';
import { connect } from "react-redux";
import {build_building} from './redux/actions';

class Buildings extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {}
	}
	
	render(){
		console.log("Building props",this.props);
		var formdata = {amount : 0};
		const Building = (data) => {
			const purchase = (event) => {
				event.preventDefault();
				var type = data.type;
				var queue = {};
				queue[type] = formdata.amount;
				REST.post('build',{
					key:this.props.userId,
					town:this.props.town.id,
					'building': queue
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
					this.props.build_building({
						town:this.props.town.id,
						'building': queue
					});
				});
				
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
				
		{Object.keys(this.props.town.buildqueue).map(e => (<div key={e}>{e}:{this.props.buildqueue[e]}</div>))}
		</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return ({
		userId: state.build.userId,
		town: state.build.town,
		translations: state.build.translations,
		buildqueue: state.build.town.buildqueue
		});
}
const actiondispatch = {
	build_building
}
export default connect(mapStateToProps,actiondispatch)(Buildings);