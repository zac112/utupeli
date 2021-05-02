import styles from './styles.module.css';
import Menu from './Menu.js';
import Overview from './Overview.js';
import Login from './Login.js';
import React from 'react';
import Translations from './language.js';
import REST from './connection';

import { connect } from "react-redux";
import {initialize, refresh, tick} from './redux/actions';

class App extends React.Component{
	constructor(props) {
		super(props);
		
		
		this.state = { 
			width: window.innerWidth, 
			height: window.innerHeight, 
			view:undefined,
			translations:new Translations().getLang('en').translations
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);		
		
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	changeLanguage(lang){
		if (lang === "en" || lang === "fi"){
			var t = new Translations();
			this.setState(t.getLang(lang))		
		}
	}
	
	login(user){
		
		console.log("User logged in ",user);
		this.props.initialize(
		{...user,
		name:user['name'],
		userId:user.key,
		townIndex:0,
		translations:new Translations().getLang('en').translations
		});
				
		this.setState({
		//	...user,
		//	userId:user.key,
		//	town:user.towns[0],
			view:<Overview/>
			});
	}
	changeview(newView){
		this.setState({view:newView});
	}
	
	statechange(state) {
		this.setState(state);
	}
	
	namechange(event){
		event.preventDefault()
		
		console.log("name changed not yet",event.target)
		var oldName = this.state.name;		
		console.log("name changed")
		REST.post("namechange",{
			'userId':this.props.userId,
			'newName':this.state.name
		}, result => {
			if (!result.success)
				this.setState({'name':oldName})
			}
		);
		this.setState({nameChange:false})
		
		
	}
	render() {		
		
		const Resourcebar = () => {
						
			let name = <div onClick={() => this.setState({nameChange:true})}>
				<div>The kingdom of {this.props.name}. (Click here to change name.)</div>
			</div>
			
			if (this.state.nameChange){
				name = <div>The kingdom of <form onSubmit={this.namechange.bind(this)}>
					<input type='text' onChange={(event) => {this.setState({name:event.target.value});}} defaultValue={this.state.name}/>
					<input type='submit' value='OK'/>
				</form>.</div>
			}
			return(
			<div>
				{name}
				<div className={styles.resourcebar}>
					<div style={{flex: "1 1 100px"}}>{this.state.translations.GOLD}: {this.props.town.gold}</div>
					<div style={{flex: "1 1 100px"}}>{this.state.translations.FOOD}: {this.props.town.food}</div>
					<div style={{flex: "1 1 100px"}}>{this.state.translations.POPULATION}: {this.props.town.population}</div>
					<div style={{flex: "1 1 100px"}}>{this.state.translations.LAND}: {this.props.town.land}</div>
				</div>
			</div>
			);
		}
		const Gameview = () => (
			<div className={styles.gameview}>
				<Resourcebar/>
				{this.state.view}
			</div>
		);
		console.log('styles',this.state);
		
		if (this.state.view === undefined){
			return (<Login translations={this.state.translations} login={this.login.bind(this)}/>);
		}else{
			return(
			<div className={styles.app} style={{height:this.state.height, width:this.state.width}} onClick={() => this.nameChange}>
				<Menu translations={this.state.translations} userId={this.props.userId} viewChangeCallback={this.changeview.bind(this)} statechange={this.statechange.bind(this)}/>
				<Gameview className={styles.gameview}/>
			</div>);
		}
	}
}

const mapStateToProps = (state) => {
	console.log("Matpstate",state.build);
	return({
		town: (state.build.towns) ?  state.build.towns[state.build.townIndex] : {},
		userId: state.build.userId,
		name: state.build.name
	});
}
const actions = {
	initialize, 
	refresh, 
	tick}

export default connect(mapStateToProps,actions)(App);


