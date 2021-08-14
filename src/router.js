import React from 'react';
import { matchPath } from "react-router";
import AsyncLoader from 'src/componentHOC/async-loader';
import LoactionComp from './client/pages/loactionComp';

const routeList = [
  {
    path: '/',
    component: AsyncLoader(() => import('./client/pages/home/')),
    exact: true
  },
  {
    path: '/list',
    component: AsyncLoader(() => import('./client/pages/list/')),
    exact: true
  }
]

const matchRoute = (path,list=routeList) =>{
  let route;
  for(var item of list){
     if(matchPath(path,item)){
      route = item;
      break;
     }
  }
  return route;
}


export default routeList;
export { matchRoute, LoactionComp };

