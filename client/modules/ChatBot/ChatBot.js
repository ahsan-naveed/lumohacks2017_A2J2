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
	      <Header/>
        <iframe className={styles.botbody}
          src='https://webchat.botframework.com/embed/surviBot?s=xhcgLp9Hd4M.cwA.Yiw.FUwe__hM7qyhfCxc3CzkWkV7XCu-HtNxnc5NXxA37Qw'>
        }
        </iframe>	     
	    </div>
    );
  }
}
