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
			  <Dropdown className={styles.headerButton} icon='align justify' floating labeled button className='icon'>
					<Dropdown.Menu>
			      <Dropdown.Item icon='user' text='My profile' />
			      <Dropdown.Item icon='treatment' text='Doctors' />
			      <Dropdown.Item icon='send outline' text='SOS' />
			    </Dropdown.Menu>
			  </Dropdown>
			</div>		 
		);
	}
}

export default Header;