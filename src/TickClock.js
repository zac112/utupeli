import React from 'react';

import REST from './connection.js';
import { connect } from "react-redux";
import {refresh} from './redux/actions';

class TickClock extends React.Component{
	
	constructor(props){
		super(props);
		
		this.state = {interval:0};

	}
	
	componentDidMount(){
		this.getNextTick();
		this.ticker = setInterval(() => this.setState({interval:Math.max(this.state.interval-1000,0)}), 1000);
	}
	
	componentWillUnmount(){
		clearTimeout(this.refresher);
		clearInterval(this.ticker);		
	}
	
	getNextTick(){
		REST.get('tick', res =>{
			var time = parseInt(res.time)-new Date()+Math.random(1000)+1000;
			this.setState({'interval':time})
			this.refresh()
			this.refresher = setTimeout(this.getNextTick.bind(this),time);			
		});
	}

	refresh() {
		//var townid = this.props.town.id		
		REST.get('player/'+this.props.userId, result =>{
			if (!result['success']) return;
			this.props.refresh({
				...result.player//,				town:result.player.towns[townid]			
			});
		});	
	}
	
	render(){
		return(
		<div>
		{this.props.translations.NEXTTURN} {parseInt(this.state.interval/1000)}
		</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {'userId': state.build.userId}
}

export default connect(mapStateToProps,{refresh})(TickClock);