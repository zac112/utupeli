import React from 'react';
import grass from './images/grass.png';
import town from './images/town.png';

class WarRoom extends React.Component{
	
	
	render(){		
	
		let flexItem = {
			display:'flex', 
			alignItems: 'flex-start', 
			flexFlow: 'row no-wrap'
		}
		let container = {
				position: "relative",
				width: "50%",
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
			console.log(data)
			if (data.data[data.x+","+data.y])
				return(	<div style={container}>
					<img alt="" src={grass}></img>
					<img alt="" style={overlay} src={town} onClick={() => {console.log("click")}}></img>
				</div>);
			else
				return(	<div style={container}>
					<img alt="" src={grass}></img>
				</div>);
			
		};
		
		var data = {
			"0,0":"Jamora"
		};
		
		return(				
		<div style={{display:'flex', alignItems: 'flex-start', flexFlow: 'column wrap'}}>
			<div style={flexItem}>
				<Square x={0} y ={0} data={data}/>
				<Square x={0} y ={1} data={data}/>
				<Square x={0} y ={2} data={data}/>
			</div>
			<div style={flexItem}>
				<div>b1</div>
				<div>b2</div>
				<div>b3</div>
			</div>
			<div style={flexItem}>
				<div>c1</div>
				<div>c2</div>
				<div>c3</div>
			</div>
			
		</div>
		);
	}
}

export default WarRoom;