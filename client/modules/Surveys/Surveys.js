import React from 'react';
import Carousel from 'nuka-carousel';
import {
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
} from './SurveyPages';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default class Surveys extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const { children, location: { pathname } } = this.props;
    return (
      <div style={{flex: 'none', height: '100%', width: '100%'}}>
        <Carousel decorators={[]}>
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
        </Carousel>
      </div>
    );
  }
}
