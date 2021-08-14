import React, { Component } from 'react';

import { connect } from 'react-redux';
import { actions } from './redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import css from 'styles/layout/header.scss';

class Header extends Component {

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  render() {
    const { children, userInfo: { userName, age, vip } } = this.props;
    return (
      <div className='main-header-box'>
        <div className='header-container'>
          <div className='brand-logo'>
            <img src='https://simplog.oss-cn-beijing.aliyuncs.com/system/logo.png'/>
          </div>
          {children}
          <div className='current-user-info'>
            <div className='avatar'>
              <img src='https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/12/17208352b0387e54~tplv-t2oaga2asx-no-mark:180:180:180:180.awebp'/>
            </div>
            <div className='user-name'>{userName}</div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default composeHOC(
  withStyles(css),
  connect(mapStateToProps)
)(Header);