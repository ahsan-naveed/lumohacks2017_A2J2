import React from 'react';
import styles from './header.css';
import { Button } from 'semantic-ui-react';

class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className={styles.header}>
				<Button className={styles.headerButton} icon='align justify' />
			</div>		 
		);
	}
}

export default Header;