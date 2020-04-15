import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './redux';
import { withRouter } from "react-router-dom";
import withStyles from 'isomorphic-style-loader/withStyles';

import{ AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import composeHOC from 'src/utils/composeHOC';
import css from './style.scss';
import logo from 'src/assets/logo.png';

class Header extends Component {

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  render(){
    const { userName, age, vip} = this.props.userInfo;
    return (
      <AppBar className="app-header">
        <Toolbar className='tool-bar'>
          <Typography variant="h6" className='logo-wrap'>
            <img src={logo}/>
          </Typography>
          <div>
            <Button onClick={() => this.props.history.push('/login')}>登录</Button>
            <Button onClick={() => this.props.history.push('/register')} color="inherit" variant="outlined">注册</Button>
          </div>
          
        </Toolbar>
      </AppBar>
      // <div className='header'>
      //   <span>名字: {userName}</span>
      //   <span>年龄: {age}</span>
      //   <span>vip: {vip ? '是':'否'}</span>
      // </div>
    ) 
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default composeHOC(
  withStyles(css),
  withRouter,
  connect(mapStateToProps)
)(Header); 