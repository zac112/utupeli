import styles from './styles.module.css';
import Menu from './Menu.js';
import Overview from './Overview.js';
import Login from './Login.js';
import React from 'react';
import Translations from './language.js';

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
		this.setState({
			...user,
			userId:user.key,
			town:user.towns[0],
			view:<Overview/>
			});
	}
	changeview(newView){
		this.setState({view:newView});
	}
	changeTown(newTown){
		this.setState({town:this.state.towns[newTown]});
	}
	
	statechange(state) {
		this.setState(state);
	}
	
	render() {		
		
		const Resourcebar = () => (
			<div className={styles.resourcebar}>
				<div style={{flex: "1 1 100px"}}>{this.state.translations.GOLD}: {this.state.town.gold}</div>
				<div style={{flex: "1 1 100px"}}>{this.state.translations.FOOD}: {this.state.town.food}</div>
				<div style={{flex: "1 1 100px"}}>{this.state.translations.POPULATION}: {this.state.town.citizens}</div>
			</div>
		);
		const Gameview = () => (
			<div className={styles.gameview}>
				<Resourcebar/>
				{this.state.view}
			</div>
		);
		console.log('styles',styles);
		
		if (this.state.view === undefined){
			return (<Login translations={this.state.translations} login={this.login.bind(this)}/>);
		}else{
			return(
			<div className={styles.app} style={{height:this.state.height, width:this.state.width}}>
				<Menu {...this.state} userId={this.state.userId} townChangeCallback={this.changeTown.bind(this)} viewChangeCallback={this.changeview.bind(this)} statechange={this.statechange.bind(this)}/>
				<Gameview className={styles.gameview}/>
			</div>);
		}
	}
}
export default App;


