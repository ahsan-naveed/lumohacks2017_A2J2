import React from 'react';
import Header from './header/header.js';
import styles from './ChatBot.css';

export default class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bot_url: 'https://webchat.botframework.com/embed/maxbi?t=EvK7YdJ3dZo.dAA.NQBvAHAAWgBuADEAYwBVADMAYwB5AEUATwA3AFAAaQAwADgAcgB4AEYAbAA.IkPkcuUv0wE.PKlBW4ncVUk.cLN-Eun03nOg-CkpKhTE-rCyRL1QqzcWymqCC6jNCrE'
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
