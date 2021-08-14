import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link } from "react-router-dom";
import withInitialData from 'src/componentHOC/with-initial-data';
import { connect } from 'react-redux';
import composeHOC from 'src/utils/composeHOC';

import css from 'styles/layout/nav.scss';


const routeList = [
  {
    path:'/',
    name:'首页'
  },
  {
    path:'/list',
    name:'列表'
  }
]
class Index extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { pathname } = this.props.state.location;
    return (
     <ul className='nav-bar'>
       {
         routeList.map(list => (
          <li key={list.path} className={list.path === pathname ? 'active' : ''}><Link to={list.path}>{list.name}</Link></li>
         ))
       }
     </ul>
     
    )
  }
}




const mapStateToProps = state => ({
  state: state,
});

export default composeHOC(
  withStyles(css),
  connect(mapStateToProps)
)(Index);