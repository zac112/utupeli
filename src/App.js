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

	fetchData(){
		//Get data from server
		let gold=100, food=51000000000000, citizens=10;
		this.setState({
			gold:gold, 
			food:food, 
			citizens:citizens,
			buildings:{
				barracks:0,
				stables:0
			}});
		console.log("Fetched data");
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
	
	login(key){
		console.log("Logged in with ",key);
		this.setState({view:<Overview/>});
		this.fetchData();
	}
	changeview(newView){
		this.setState({view:newView});
	}
	
	statechange(state) {
		this.setState(state);
	}
	
	render() {		
		
		const Resourcebar = () => (
			<div className={styles.resourcebar}>
				<div style={{flex: "1 1 100px"}}>{this.state.translations.GOLD}: {this.state.gold}</div>
				<div style={{flex: "1 1 100px"}}>{this.state.translations.FOOD}: {this.state.food}</div>
				<div style={{flex: "1 1 100px"}}>{this.state.translations.POPULATION}: {this.state.citizens}</div>
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
				<Menu {...this.state} viewChangeCallback={this.changeview.bind(this)} statechange={this.statechange.bind(this)}/>
				<Gameview className={styles.gameview}/>
			</div>);
		}
	}
}
export default App;


