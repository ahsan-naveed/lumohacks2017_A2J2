import React from 'react';
import { redirect } from '../../routes.js';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.8,
    zIndex: 99,
  },
};

const NavBar = () => (
  <div style={styles.container}>
    <button onClick={() => redirect('/')}>Login</button>
    <button onClick={() => redirect('surveys')}>Surveys</button>
    <button onClick={() => redirect('chatbot')}>ChatBot</button>
  </div>
);

export default NavBar;
