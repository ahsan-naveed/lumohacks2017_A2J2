import React from 'react';
import styles from './header.css';
import { Dropdown } from 'semantic-ui-react';

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const options = [
			{ key: 1, text: 'My profile' },
			{ key: 2, text: 'Doctors'},
			{ key: 3, text: 'SOS'}
		]
		

		return (
			<div className={styles.header}>
			</div>		 
		);
	}
}

export default Header;