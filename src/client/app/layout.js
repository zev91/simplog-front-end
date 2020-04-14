import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link,withRouter } from "react-router-dom";

import { hot } from 'react-hot-loader/root';
import Header from 'src/componentLayout/header';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'src/share/theme';
import css from './layout.scss';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideHeader : this.hideHeader(props)
    }
  }

  hideHeader = props => {
    const { pathname } = props.location;
    return ['/register','/login'].indexOf(pathname) > -1;
  }

  render() {
    const { hideHeader } = this.state;
    return (
      <ThemeProvider theme={theme}>
          {
            !hideHeader && <Header />
          }
          <div>{this.props.children}</div>
      </ThemeProvider>
    )
  }
}

export default withRouter(withStyles(css)(hot(Index)));