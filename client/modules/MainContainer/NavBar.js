import React from 'react';
import { redirect } from '../../routes.js';

const NavBar = () => (
  <div>
    <h1>this is the navbar</h1>
    <button onClick={() => redirect('/')}>Login</button>
    <button onClick={() => redirect('/')}>Surveys</button>
    <button onClick={() => redirect('chatbot')}>ChatBot</button>
  </div>
);

export default NavBar;
