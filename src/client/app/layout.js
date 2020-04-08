import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from "react-router-dom";
import { hot } from 'react-hot-loader/root';
import Header from 'src/componentLayout/header';

import css from './layout.scss';

class Index extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='layout-box'>
        <Header />
        <header>
          <Link to='/'>首页</Link>
          <Link to='/list'>列表页</Link>
        </header>
       
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default withStyles(css)(hot(Index));