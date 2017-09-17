import React from 'react';
import Header from './header/header.js';
import styles from './ChatBot.css';

export default class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bot_url: 'https://webchat.botframework.com/embed/maxbi?s=EvK7YdJ3dZo.cwA.05I.oEIWVSpo4SUgzPfM60-1XhZIsv4tCpwWlhvmyilNSZc'
    };
  }

  render() {
    return (
      <div className={styles.mainbody}>
        <Header />
        <iframe
          style={{height: '100%', border: 'none'}}
          src={this.state.bot_url}></iframe>
      </div>
    );
  }
}
