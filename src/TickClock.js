import React from 'react';

class TickClock extends React.Component{
	
	constructor(props){
		super(props);
		
		this.state = {interval:props.interval};
		console.log(this.state);

	}
	
	componentDidMount(){
		this.refresher = setTimeout(this.refresh.bind(this),this.state.interval);
		this.ticker = setInterval(this.tick.bind(this), 1000);
	}
	
	componentWillUnmount(){
		clearTimeout(this.refresher);
		clearInterval(this.ticker);		
	}
	
	refresh() {
		//get data from server		
		this.setState({interval:60000});
		this.refresher = setTimeout(this.refresh.bind(this),this.state.interval);
		
	}
	
	tick(){
		var time = this.state.interval;
		this.setState({interval:time-1000});
	}

	
	render(){
		return(
		<div>
		{this.props.translations.NEXTTURN} {this.state.interval/1000}
		</div>
		);
	}
}

export default TickClock;