import React from 'react';
import { redirect } from '../../routes.js';
import { Form, Input, Button, Segment } from 'semantic-ui-react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.8,
    zIndex: 99,
    width: '100%',
  },
};

const NavBar = () => (
  <div style={styles.container}>
  	<Button.Group>
	    <Button onClick={() => redirect('/')}>Login</Button>
	    <Button onClick={() => redirect('surveys')}>Surveys</Button>
	    <Button onClick={() => redirect('chatbot')}>ChatBot</Button>
    </Button.Group>
  </div>
);

export default NavBar;