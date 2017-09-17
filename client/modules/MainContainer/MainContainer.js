import React, { PropTypes } from 'react';
import NavBar from './NavBar';

const styles = {
  display: 'flex',
  flexFlow: 'column',
  width: '100%',
  height: '100%',
  margin: 'auto',
  alignSelf: 'center',

};

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}
MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
