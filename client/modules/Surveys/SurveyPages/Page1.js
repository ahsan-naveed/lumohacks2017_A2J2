import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './pages.css';
import robot from './robot.png';
import gear from './gear.png';
import gear2 from './gear2.svg';

const myStyles = {
  background: {
    backgroundColor: '#93dc66',
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
          <img className={styles.gear} height={140} src={gear} />
          <img className={styles.gear2} height={75} src={gear2} />
          <img className={styles.robot} height={100} src={robot} />
        </div>
        <span style={myStyles.bodyText}>
          <h1>Nice to meet you!</h1>
          <h2>I'm Maxby, a personal assistant trained to help you take care of your health.</h2>
        </span>
      </div>
    );
  }
}
