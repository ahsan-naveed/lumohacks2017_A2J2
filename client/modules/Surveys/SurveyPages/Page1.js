import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './pages.css';
import robot from './robot.png';
import gear from './gear.png';
import gear2 from './gear2.svg';

const myStyles = {
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
  },
};

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles['pages-container']}>
        <div style={myStyles.imageContainer}>
          <img className={styles.gear} height={140} src={gear} />
          <img className={styles.gear2} height={75} src={gear2} />
          <img className={styles.robot} height={100} src={robot} />
        </div>
        <span style={myStyles.bodyText}>
          <h1>Nice to meet you!</h1>
          <h3>I'm _____, a chat bot trained to help you take care of your mental health.</h3>
        </span>
      </div>
    );
  }
}
