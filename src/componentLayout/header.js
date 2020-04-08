import React, { Component } from 'react';

import { connect } from 'react-redux';
import { actions } from './redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import css from './style.scss';

class Header extends Component {

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  render(){
    const { userName, age, vip} = this.props.userInfo;
    return (
      <div className='header'>
        <span>名字: {userName}</span>
        <span>年龄: {age}</span>
        <span>vip: {vip ? '是':'否'}</span>
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