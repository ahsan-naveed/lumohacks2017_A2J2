import React from 'react';
import styles from './body.css';
import Bot from '../../../../chatbot.js';

class Body extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(Bot);
		return (
			<div>Me is bot</div>
		);
	}
}

export default Body;
