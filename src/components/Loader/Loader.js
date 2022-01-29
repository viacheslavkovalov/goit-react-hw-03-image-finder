import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Wrapper } from './StyledLoader';

export default class LoaderComponent extends Component {
  render() {
    return (
      <Wrapper>
        <Loader type="Audio" color="#6b9fed" height={80} width={80} />
      </Wrapper>
    );
  }
}
