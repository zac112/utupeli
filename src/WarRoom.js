import React from 'react';
import grass from './images/grass.png';
import road from './images/road.png';
import town from './images/town.png';
import hero from './images/hero.png';
import ownhero from './images/hero.png';
import owntown from './images/owntown.png';
import REST from './connection.js';

import { connect } from "react-redux";

class WarRoom extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {'loading':true}
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
		console.log(data)
	}
	
	render(){		
	
		let flexItem = {
			display:'flex', 
			alignItems: 'flex-start', 
			flexFlow: 'row no-wrap',
			height: '50px'
		}
		let container = {
				position: "relative",
				max_width: "300px"
				
			};
		
		let overlay ={
		  position: "absolute",
		  top: 0,
		  left:0,
		  background: "rgba(0, 0, 0, 0)",
		  width: "100%",
		  transition: ".5s ease",
		  color: "white",
		  font_size: "20px",
		  text_align: "center"
		  
		}
		const Square = (data) => {
			//console.log(data)
			if (!data.player)
				return(	<div style={container}>
						<img alt="" src={grass}></img>
					</div>);
					
			let {towns,roads,enemy,heros} = data.player;
			let coord = data.x+","+data.y;
			let result = [<img key={coord} alt="" src={grass}/>];
			
			if (towns?.length > 0)
				if(towns.includes(this.props.name))
					result.push(<img alt="" style={overlay} src={owntown} onClick={() => {this.selectionmenu(data.player)}}/>);
				else
					result.push(<img alt="" style={overlay} src={town} onClick={() => {this.selectionmenu(data.player)}}></img>);

			
			if(heros?.length > 0){
				if(heros.includes(this.props.name))
					result.push(<img alt="" style={overlay} src={ownhero} onClick={() => {this.selectionmenu(data.player)}}/>);
				else
					result.push(<img alt="" style={overlay} src={hero} onClick={() => {this.selectionmenu(data.player)}}></img>);
			}
			
			if(roads?.length > 0){
				result[0] = <img alt="" src={road}/>;
			}
			
			
			if(enemy?.length > 0){								
				result.push(<img alt="" style={overlay} src={owntown} onClick={() => {this.selectionmenu(data.player)}}/>);
			}
			
			/*if (data.player){
				if (data.player == this.props.name)
					return(	<div style={container}>
						<img alt="" src={grass}></img>
						<img alt="" style={overlay} src={owntown} onClick={() => {console.log(data.player)}}></img>
					</div>);
				else if (data.player == 'road'){
					return(	<div style={container}>
						<img alt="" src={road}></img>
					</div>);
				}
				else
					return(	<div style={container}>
						<img alt="" src={grass}></img>
						<img alt="" style={overlay} src={town} onClick={() => {console.log(data.player)}}></img>
					</div>);
			}
			else*/
			return(	
			<div style={container}>
				{result}
			</div>
			);
			
		};
		
		const Row = (row) =>{
			var result = []
			for (var y=-(size/2); y<(size/2)+1; y++){
				result.push(<Square x={row.x} y={y} player={row.data[row.x+','+y]}/>);
			}
			return result.map(e=>e);
		};		
		if (this.state.loading)
			return(<div>Loading</div>)
		else{
			var size= this.state.size;
			var result=[];
			for (var x=-(size/2); x<(size/2)+1; x++){
				result.push(<div style={flexItem}><Row x={x} size={size} data={this.state.data}/></div>);
			}
			return(				
			<div>
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