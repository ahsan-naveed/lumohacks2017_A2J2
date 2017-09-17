import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './pages.css';
import { redirect } from '../../../routes';
import teamwork from './teamwork.png';

const myStyles = {
  background: {
    backgroundColor: '#4c9fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  bodyText: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 2rem',
    marginTop: '2rem',
    color: 'white',
    textShadow: '1px 1px #707070',
  },
};

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={myStyles.background} className={styles['pages-container']}>
        <div style={myStyles.imageContainer}>
          <img className={styles.teamwork} height={175} src={teamwork} />
        </div>
        <span style={myStyles.bodyText}>
          <h1>Are you ready?</h1>
          <button className="ui inverted button" onClick={() => redirect('/chatbot')}>LET'S BEGIN!</button>
          {/*<Button inverted basic color="white" onClick={() => redirect('/chatbot')}>LET'S BEGIN!</Button>*/}
        </span>
      </div>
    );
  }
}
