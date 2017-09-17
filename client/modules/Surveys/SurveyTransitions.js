import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
  },
  transitionsContainer: {
    flex: 1,
    position: 'relative',
  },
  transitions: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
};

class SurveyTransitions extends React.Component {
  constructor(props) {
    super(props);
    this.transition = 'slide-up';
  }
  componentDidUpdate(nextProps) {
    const prevIndex = nextProps.children.props.route.index - 1;
    const nextIndex = nextProps.children.props.route.index;

    // Set the animation depending on the index we are moving to
    // If the next route skips over the sequence, use a fade-in animation
    if (nextIndex === prevIndex + 1) {
      this.transition = 'slide-up';
    } else if (nextIndex === prevIndex - 1) {
      this.transition = 'slide-down';
    } else if ((nextIndex > prevIndex + 1) || (nextIndex < prevIndex - 1)) {
      this.transition = 'fade';
    }
  }
  render() {
    const { children, pathname } = this.props;
    return (
      <div style={styles.transitionsContainer}>
        {/*<ReactCSSTransitionGroup*/}
          {/*style={styles.transitions}*/}
          {/*transitionName={this.transition}*/}
          {/*transitionEnterTimeout={500}*/}
          {/*transitionLeaveTimeout={500}*/}
        {/*>*/}
          {this.props.children}
        {/*</ReactCSSTransitionGroup>*/}
      </div>
    );
  }
}
SurveyTransitions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SurveyTransitions;
