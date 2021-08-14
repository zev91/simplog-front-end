import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from "react-router-dom";
import { hot } from 'react-hot-loader/root';
import Header from 'src/componentLayout/header';
import Nav from 'src/componentLayout/nav';

import css from 'styles/layout/layout.scss';

class Index extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
       <Header >
         <Nav/>
       </Header>
        
       <div className='layout-box'>
         <div className='body-container'>{this.props.children}</div>
      </div>
      </>
     
    )
  }
}

export default withStyles(css)(hot(Index));