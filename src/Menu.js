import React from 'react';
import styles from './styles.module.css';
import TickClock from './TickClock.js';
import Army from './Army.js';
import WarRoom from './WarRoom.js';
import Overview from './Overview.js';
import Buildings from './Buildings.js';

class Menu extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {};
	}
	
	render(){
		console.log("Menu props",this.props);
		const Link = (linkprops) => {
			const onclick = (e)=> {
				this.props.viewChangeCallback(linkprops.target);
				this.setState({view:linkprops.target});
				console.log("Clicked ",linkprops.target)
			};
			
			return(
				<div onClick={onclick}>{linkprops.name}</div>
			)
		};
		
		var buildings = <Buildings {...this.props}/>;
		var army = <Army {...this.props}/>;
		var warroom = <WarRoom {...this.props}/>;
		var overview = <Overview {...this.props}/>;
		return(
		<div className={styles.menu}>
		<TickClock translations={this.props.translations} onTick={this.props.viewChangeCallback} interval={parseInt(this.props.nextTick)}/>
		
		
		<Link target={overview} name={this.props.translations.OVERVIEW} nextTick={this.props.nextTick}/>
		<Link target={buildings} name={this.props.translations.BUILDINGS} nextTick={this.props.nextTick}/>
		<Link target={army} name={this.props.translations.ARMY} nextTick={this.props.nextTick}/>
		<Link target={warroom} name={this.props.translations.WARROOM} nextTick={this.props.nextTick}/>
				
		</div>);
	}
}

export default Menu;