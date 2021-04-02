import React from 'react';
import styles from './Overview.module.css';

class Login extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			logged:false,
			creatingAccount:false,
			verification:'hidden'
			};
	}
	createAccount(){
		var data = {};
		const create = (event) => {
			event.preventDefault();
			this.setState({verification:'visible'});
		}
		
		const verify = (event) => {
			event.preventDefault();
			console.log(data.key);
			this.props.login(data.key);
		}
		
		const valuechange = (event) => {
			event.preventDefault();
			data['key'] = event.target.value;
			
		}
		return(
		<div className={styles.overview}>
		{this.props.translations.CREATEINSTRUCTIONS}
			<form onSubmit={create}>
				<label>
				{this.props.translations.ENTERUTUMAIL}
					<input type="text" onChange={valuechange} />
				</label>
				<input type="submit" value={this.props.translations.CREATE} />
			</form>
			
			<form style={{visibility:this.state.verification}} onSubmit={verify}>
				<label>
				{this.props.translations.VERIFICATIONENTRY}
					<input type="text" onChange={valuechange} />
				</label>
				<input type="submit" value={this.props.translations.VERIFY} />
			</form>
		</div>);
	}
	
	loginScreen(){
		var data = {};
		const login = (event) => {
			event.preventDefault();
			console.log(data.key);
			this.props.login(data.key);
		}
		
		const valuechange = (event) => {
			event.preventDefault();
			data['key'] = event.target.value;
			
		}
		
		return(
		<div className={styles.overview}>
			<form onSubmit={login}>
				<label>
				{this.props.translations.LOGINTEXT}
					<input type="text" onChange={valuechange} />
				</label>
				<input type="submit" value={this.props.translations.LOGIN} />
			</form>
			
			<div onClick={() => this.setState({creatingAccount:true})}>
				Don't have a city yet? Create one here!
			</div>
		</div>);
	}
	
	render(){
		
		if (this.state.creatingAccount) return this.createAccount();
		else return this.loginScreen();
	}
}

export default Login;