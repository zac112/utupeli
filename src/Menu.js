import React from 'react';
import styles from './styles.module.css';
import TickClock from './TickClock.js';
import Army from './Army.js';
import WarRoom from './WarRoom.js';
import Overview from './Overview.js';
import Buildings from './Buildings.js';

class Menu extends React.Component{
	
	render(){
		console.log("Menu props",this.props);
		const Link = (linkprops) => {
			const onclick = (e)=> {
				this.props.viewChangeCallback(linkprops.target);
				console.log("Clicked ",linkprops.target)
			};
			
			return(
				<div onClick={onclick}>{linkprops.name}</div>
			)
		};
		
		return(
		<div className={styles.menu}>
		<TickClock translations={this.props.translations} interval={6000}/>
		
		
	<Link target=<Overview {...this.props}/> name={this.props.translations.OVERVIEW}/>
		<Link target=<Buildings {...this.props}/> name={this.props.translations.BUILDINGS}/>
		<Link target=<Army {...this.props}/> name={this.props.translations.ARMY}/>
		<Link target=<WarRoom {...this.props}/> name={this.props.translations.WARROOM}/>
				
		</div>);
	}
}

export default Menu;