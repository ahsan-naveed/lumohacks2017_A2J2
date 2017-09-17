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
        <iframe src='https://webchat.botframework.com/embed/maxbi?s=EvK7YdJ3dZo.cwA.ego._C-_B5m2dEzv8nVhNS-jCP8jk0BolA6g3V5aBYl9ICs'></iframe>
      </div>
    );
  }
}
