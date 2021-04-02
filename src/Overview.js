import React from 'react';
import styles from './Overview.module.css';

class Overview extends React.Component{
	render(){
		return(
		<div className={styles.overview}>
		Current buildings. Construction queue (army, buildings).
		</div>
		);
	}
}

export default Overview;