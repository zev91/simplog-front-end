import React from 'react';
import { matchPath } from "react-router";
import AsyncLoader from 'src/componentHOC/async-loader';

const routeList = [
  {
    path: '/404',
    component: AsyncLoader(() => import('./client/pages/404/')),
    exact: true
  },
  {
    path: '/list',
    component: AsyncLoader(() => import('./client/pages/list/')),
    exact: true
  },
  {
    path: '/register',
    component: AsyncLoader(() => import('./client/pages/register/')),
    exact: true
  },
  {
    path: '/login',
    component: AsyncLoader(() => import('./client/pages/login/')),
    exact: true
  },
  {
    path: '/editor/post/:id',
    component: AsyncLoader(() => import('./client/pages/post-editor/')),
    exact: true
  },
  {
    path: '/editor/draft/:id',
    component: AsyncLoader(() => import('./client/pages/draft-editor/')),
    exact: true
  },
  {
    path: '/post/:id',
    component: AsyncLoader(() => import('./client/pages/post-detail/')),
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
export { matchRoute };

