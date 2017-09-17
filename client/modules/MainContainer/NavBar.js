import React from 'react';
import { redirect } from '../../routes.js';

const NavBar = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button onClick={() => redirect('/')}>Login</button>
    <button onClick={() => redirect('surveys')}>Surveys</button>
    <button onClick={() => redirect('chatbot')}>ChatBot</button>
  </div>
);

export default NavBar;
