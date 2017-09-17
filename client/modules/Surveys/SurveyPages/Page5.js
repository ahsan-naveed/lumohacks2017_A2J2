import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './pages.css';
import { redirect } from '../../../routes';

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
        <span style={myStyles.bodyText}>
          <h1>Are you ready?</h1>
          <Button basic color="green" onClick={() => redirect('/chatbot')}>LET'S START!</Button>
        </span>
      </div>
    );
  }
}
