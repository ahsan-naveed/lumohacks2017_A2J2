import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './page1.css';

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <button className={styles.test}>testing</button>
        <Button basic color="orange">Click Me!</Button>
        <Button basic color="red">Click Me!</Button>
        <Button basic color="green">Click Me!</Button>
      </div>
    );
  }
}
