import React from 'react';

class Gameview extends React.Component{
	
	render(){
		const Resourcebar = () => (
		<div>
			<div>Kulta: {this.props.gold}</div>
			<div>Ruoka: {this.props.food}</div>
			<div>Asukkaat: {this.props.citizens}</div>
		</div>
		)
		return(
		<div>
		<Resourcebar/>
		{this.props.view}
		</div>
		);
	}
}

export default Gameview;