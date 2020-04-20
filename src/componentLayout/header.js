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
import logo from 'src/assets/logo.png';


class Header extends Component {

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  componentDidMount() {
    const { username } = this.props.userInfo;
    !username && this.props.getInitialData();
  }

  render() {
    const { username } = this.props.userInfo;
    return (
      <AppBar className="app-header">
        <Toolbar className='tool-bar'>
          <Typography variant="h6" className='logo-wrap'>
            <img src={logo} />
          </Typography>

          <div className='right-tool-wrap'>
            {
              !username ? (
                <div>
                  <Button onClick={() => this.props.history.push('/login')}>登录</Button>
                  <Button onClick={() => this.props.history.push('/register')} color="inherit" variant="outlined">注册</Button>
                </div>
              ) : <Avatar className='user-avater'>{username[0]}</Avatar>
            }
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              // className={classes.button}
              onClick={() => this.props.history.push('/editor/post/33')}
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