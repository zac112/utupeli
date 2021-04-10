import React from 'react';

import { connect } from "react-redux";

class TickClock extends React.Component{
	
	constructor(props){
		super(props);
		
		this.state = {interval:props.nextTick};
		console.log(this.state);

	}
	
	componentDidMount(){
		this.refresher = setTimeout(this.refresh.bind(this),this.props.nextTick);
		this.ticker = setInterval(this.tick.bind(this), 1000);
	}
	
	componentWillUnmount(){
		clearTimeout(this.refresher);
		clearInterval(this.ticker);		
	}
	
	refresh() {
		//get data from server		
		
		this.setState({interval:this.props.nextTick});
		this.refresher = setTimeout(this.refresh.bind(this),this.props.nextTick);
		
	}
	
	tick(){
		var time = this.state.interval;
		this.setState({interval:time-1000});
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
	return {'nextTick': parseInt(state.build.nextTick)}
}

export default connect(mapStateToProps)(TickClock);