import React from 'react';
import styles from './Overview.module.css';
import REST from './connection.js';

class Login extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			logged:false,
			creatingAccount:false,
			verification:'hidden',
			readonly:false
			};
	}
	createAccount(){
		var data = {};
		const create = (event) => {
			event.preventDefault();
			
			if(data['email'].endsWith('@utu.fi')){
				REST.post("createAccount",{
					'id':data['email']
				},(res) => {
					console.log("Got key",res);					
					if(res['success']){
						this.setState({
							verification:'visible',
							message:this.props.translations.CHECKEMAIL,
							readonly:"readonly"
							});					
					}if (res['dev']){
						this.setState({
							verification:'visible',
							message:res['dev'],
							readonly:"readonly"
							});		
					}else{
						this.setState({message:"That address seems to be in use"});
					}
				}
				);
			}else{
				this.setState({message:"That address is not a valid utu-email."});
			}
			
		}
		
		const emailchange = (event) => {
			event.preventDefault();
			data['email'] = event.target.value;			
		}
		
		return(
		<div className={styles.overview}>
		{this.props.translations.CREATEINSTRUCTIONS}
			<form onSubmit={create}>
				<label>
				{this.props.translations.ENTERUTUMAIL}
					<input type="text" onChange={emailchange} readOnly={this.state.readonly}/>
				</label>
				<input type="submit" value={this.props.translations.CREATE} />
			</form>
			
			{this.state.message}
			
		</div>);
	}
	
	loginScreen(){
		var data = {};
		const login = (event) => {
			event.preventDefault();
			REST.post('login',
			{key:data.key},
			(res) => {
				console.log("Got logged in player:",res);
				if(res['player']){
					console.log(data.key);
					this.props.login(res['player']);
				}else{
					this.setState({message:"No player data found."});
				}
			});
			
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
			{this.state.message}
			<div onClick={() => this.setState({creatingAccount:true})}>
				{this.props.translations.REGISTERLINK}
			</div>
		</div>);
	}
	
	render(){
		
		if (this.state.creatingAccount) return this.createAccount();
		else return this.loginScreen();
	}
}

export default Login;