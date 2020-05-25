import React, { Component } from 'react';

import { hot } from 'react-hot-loader/root';
import Header from 'src/componentLayout/header';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      [
      <Header />,
      <div>{this.props.children}</div>
      ]
    )
  }
}

export default hot(Index);