import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './pages.css';
import checklist from './checklist.jpg';

const myStyles = {
  background: {
    backgroundColor: '#9570dc',
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
          <img className={styles.checklist} height={150} src={checklist} />
        </div>
        <span style={myStyles.bodyText}>
          <h2>I'll help prepare you for your appointments.</h2>
        </span>
      </div>
    );
  }
}
