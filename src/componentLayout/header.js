import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './redux';
import { withRouter } from "react-router-dom";
import withStyles from 'isomorphic-style-loader/withStyles';

import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import composeHOC from 'src/utils/composeHOC';
import css from './style.scss';
import Toast from 'src/componentCommon/toast';
import logo from 'src/assets/logo.png';


class Header extends Component {

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  componentDidMount() {
    if(this.props.userInfo['userInfo.getInitialData.pending'] !== false){
      this.props.getInitialData();
    }
  }
  goToDraft = () => {
    if(this.props.userInfo.username){
      this.props.history.push('/editor/draft/new');
    }else{
      Toast.error('请先登录！')
      this.props.history.push('/login');
    }
  }

  goToHomePage = () => {
    this.props.history.push('/list');
    // console.log(this.props)
  }

  render() {
    const { userInfo } = this.props;
    console.log(userInfo.username)
    return (
      <AppBar className="app-header">
        <Toolbar className='tool-bar'>
          <Typography variant="h6" className='logo-wrap' onClick={this.goToHomePage}>
            <img src={logo} />
          </Typography>

          <div className='right-tool-wrap'>
            {
              !userInfo.username ? (
                <div>
                  <Button onClick={() => this.props.history.push('/login')}>登录</Button>
                  <Button onClick={() => this.props.history.push('/register')} color="inherit" variant="outlined">注册</Button>
                </div>
              ) : <Avatar className='user-avater'>{userInfo.username[0]}</Avatar>
            }
            <Button
              // variant="contained"
              color="secondary"
              disableElevation
              // className={classes.button}
              onClick={this.goToDraft}
              startIcon={<CreateIcon />}
            >
              写文章
          </Button>
          </div>

        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default composeHOC(
  withStyles(css),
  withRouter,
  connect(mapStateToProps, actions)
)(Header); 