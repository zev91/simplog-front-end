import React from 'react';
import { matchPath } from "react-router";
import Home from './client/pages/index';
import List from './client/pages/list';

const routeList = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/list',
    component: List,
    exact: true
  }
]

const matchRoute = path =>{
  let route;
  for(var item of routeList){
     if(matchPath(path,item)){
      route = item;
      break;
     }
  }
  return route;
}


export default routeList;
export { matchRoute };

