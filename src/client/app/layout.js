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
      hideHeader : this.hideHeader(props.location)
    }
  }

  hideHeader = location => {
    const { pathname } = location;
    return ['/register','/login'].indexOf(pathname) > -1;
  }

  componentDidMount(){
    console.log('this.componentDidMount')
    this.props.history.listen(location => {
      // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
      if (this.props.location.pathname !== location.pathname) {
        this.setState({
          hideHeader : this.hideHeader(location)
        })
      }
  })

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