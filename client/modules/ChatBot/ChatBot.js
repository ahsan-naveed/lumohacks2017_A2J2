import React from 'react';
import Header from './header/header.js';
import styles from './ChatBot.css';

export default class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.mainbody}>
        <Header />
        <iframe src='http://webchat.botframework.com/embed/maxbi?&t=EvK7YdJ3dZo.dAA.NgBPAGkAbgBhADgASQBOAEsAcQBqADYAagB1AG0AdgBOAGoAVABEAFkAUgA.8K6RIt8v0wE.tGDNpzQINRQ.EPODG_8qO9EshT9XAmRB_TzNb3omqHR4T89K1jF7m_c'></iframe>
      </div>
    );
  }
}
