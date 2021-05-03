import React from 'react';
import grass from './images/grass.png';
import road from './images/road.png';
import town from './images/town.png';
import hero from './images/hero.png';
import ownhero from './images/hero.png';
import owntown from './images/owntown.png';
import REST from './connection.js';


import styles from './WarRoom.module.css';
import { connect } from "react-redux";

class WarRoom extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {'loading':true, 'menuStyle':'hidden'}
		this.selectionmenu.bind(this);
	}
	
	componentDidMount(){
		this.setState({'loading':true})
		this.getMap(0,0,10)
	}
	
	getMap(x,y, size){
		REST.get('map/'+size+'/'+x+'/'+y,(result) => {
			this.setState({
				'data':result,
				'loading':false,
				'size':size
			});
		});
	}
	
	selectionmenu(data){
		console.log(data);
		let {x,y} = data;
		this.setState({
			x:x,
			y:y,
			'menuStyle':'visible',
			'menuData':data.player
			});
	}
	
	render(){			
		let imgSize = 50;
		
		const Menu = (props) => {
			const TownButton = (props1) => {				
				if (!this.state.menuData?.towns) return null;
				
				return(
				<div className={styles.menuItem}>
					<button onClick={()=>{ this.setState({'townVisible':!this.state.townVisible}); }}>Town</button>
					<div style={{'display':(this.state.townVisible?'block':'none')}}>
					block
					</div>
				</div>);
			}
			const HeroButton = (props1) => {
				console.log(this.state.menuData)
				if (!this.state.menuData?.heros) return "";
				
				return(
				<div className={styles.menuItem}>
					<button onClick={()=>{ this.setState({'heroVisible':!this.state.heroVisible}); }}>Hero</button>
					<div style={{'display':(this.state.heroVisible?'block':'none')}}>
					<button onClick={()=>{ this.setState({'heroVisible':!this.state.heroVisible}); }}>Move hero</button>
					</div>
				</div>);
			}
			const DungeonButton = (props1) => {
				if (!this.state.menuData?.enemys) return "";
				
				return <button>Town</button>
			}
			
			console.log("Room props:",props)
			let cname = styles.menu;
			if (this.state.menuStyle === "hidden"){
				cname = cname && styles.hidden;
			}
			let y = this.state.size*imgSize/2+this.state.y*imgSize;
			let x = this.state.size*imgSize/2+this.state.x*imgSize;
			let height = this.state.height;
			console.log("xy",x,y);
			return(
			<div className={cname} style={{top:y+"px", left:x+"px",zIndex:2}} onMouseLeave={()=>{this.setState({'menuStyle':'hidden'})}}>	
				<TownButton data={this.props?.player?.towns}/>
				<HeroButton data={this.props?.player?.heros}/>
			<div className={styles.menuItem}>
				<button onClick={()=>{this.setState({'menuStyle':'hidden'})}}>Close</button>
			</div>
			</div>
			);
		}
		
		let counter = 0;
		const Square = (data) => {			
			if (!data.player)
				return(	<div key={counter++} className={styles.container}>
						<img key={counter++}  alt="" src={grass}/>
					</div>);
					
			let {towns,roads,enemy,heros} = data.player;
			let coord = data.x+","+data.y;
			let result = [<img key={counter++} alt="" src={grass}/>];
			
			if(roads?.length > 0){
				result[0] = <img key={counter++}  alt="" src={road}/>;
			}
			
			if (towns?.length > 0)
				if(towns.includes(this.props.name))
					result.push(<img key={counter++} alt="" className={styles.overlay} src={owntown} onClick={() => {this.selectionmenu(data)}}/>);
				else
					result.push(<img key={counter++} alt="" className={styles.overlay} src={town} onClick={() => {this.selectionmenu(data)}}/>);

			
			if(heros?.length > 0){
				if(heros.includes(this.props.name))
					result.push(<img key={counter++} alt="" className={styles.overlay} src={ownhero} onClick={() => {this.selectionmenu(data)}}/>);
				else
					result.push(<img key={counter++} alt="" className={styles.overlay} src={hero} onClick={() => {this.selectionmenu(data)}}/>);
			}
			
			if(enemy?.length > 0){								
				result.push(<img key={counter++} alt="" className={styles.overlay} src={owntown} onClick={() => {this.selectionmenu(data)}}/>);
			}

			return(	
			<div key={counter++} className={styles.container}>
				{result}
			</div>
			);
			
		};
		
		const Row = (row) =>{
			var result = []
			for (var y=-(size/2); y<(size/2)+1; y++){
				result.push(<Square key={counter++} x={row.x} y={y} player={row.data[row.x+','+y]}/>);
			}
			return result.map(e=>e);
		};		
		if (this.state.loading)
			return(<div>Loading</div>)
		else{
			var size= this.state.size;
			var result=[];
			for (var x=-(size/2); x<(size/2)+1; x++){
				result.push(<div key={counter++} className={styles.flexItem}>
					<Row key={counter++} x={x} size={size} data={this.state.data}/>
				</div>);
			}
			return(				
			<div style={{position:"relative"}}>
			<Menu/>
			{result}
			</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {'name': state.build.name}
}

export default connect(mapStateToProps)(WarRoom);