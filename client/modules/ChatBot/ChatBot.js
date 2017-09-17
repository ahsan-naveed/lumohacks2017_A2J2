import React from 'react';
import Header from './header/header.js';

export default class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
    	<div>
	      <Header/>
	      <h2>Chatbot interface</h2>
	    </div>
    );
  }
}
