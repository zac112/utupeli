import React from 'react';
import styles from './styles.module.css';
import TickClock from './TickClock.js';
import Army from './Army.js';
import WarRoom from './WarRoom.js';
import Overview from './Overview.js';
import Buildings from './Buildings.js';
import Land from './Land.js';

import { connect } from "react-redux";
import {townchange} from './redux/actions';

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
		var land = <Land {...this.props}/>
		return(
		<div className={styles.menu}>
		<TickClock translations={this.props.translations}/>
		
		
		<Link target={overview} name={this.props.translations.OVERVIEW} />
		<Link target={buildings} name={this.props.translations.BUILDINGS} />
		<Link target={army} name={this.props.translations.ARMY} />
		<Link target={warroom} name={this.props.translations.WARROOM} />
		<Link target={land} name={this.props.translations.LAND} />
				
		</div>);
	}
}

export default connect(null,{townchange})(Menu);