import React from 'react';
import styles from './Overview.module.css';
import REST from './connection'

import { connect } from "react-redux";
import {updateTown} from './redux/actions';

class Land extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {land:0};
	}
	
	valuechange(event){
		event.preventDefault();
		var value = event.target.value;
		value = value.replace(/[^0-9]/g, "");
		this.setState({land:value})
	}
	
	purchase(event){
		event.preventDefault();
		REST.post('expedition',{
			key:this.props.userId,
			townIndex:this.props.town.id,
			land:this.state.land
		},
		result => {
			if(!result['success'])return;
			this.props.updateTown(result['town']);
			console.log("SUCCESS",result['town']);
		});
	}
	
	render(){
		var text = <div>Land. Fund expeditions to get more. Funding expeditions costs scouts and gold, additionally each piece of land is harder to secure and thus costs more. Your next piece of land will cost {this.props.landScoutCost} scouts and {this.props.landGoldCost} gold. You are currently eploring {this.props.landqueue} land</div>
		var limit = ""
		if(this.props.maxLand) limit = <div>You are allowed to have at most {this.props.maxLand} land here.</div>;
		
		return(
		<div className={styles.overview}>
			{text}
			{limit}
		<form onSubmit={this.purchase.bind(this)}>
			<label>
			Send an expedition for more land.
				<input type="text"  value={this.state.land} onChange={this.valuechange.bind(this)} />
			</label>
			<input type="submit" defaultValue={this.props.translations.BUY} />
		</form>			
		</div>
		);
	}
}
const mapStateToProps = (state) => {
	console.log(state);
	return ({
		userId: state.build.userId,
		town: state.build.towns[state.build.townIndex],
		translations: state.build.translations,
		maxLand: (state.build.towns[state.build.townIndex].maxLand || 100)
		});
}
const actiondispatch = {
	updateTown
}

export default connect(mapStateToProps, {updateTown})(Land);