import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import routeList, { matchRoute } from '../router';
import { decrypt } from '../utils/helper';
import proConfig from '../share/pro-config';

function renderDom() {
  ReactDom.hydrate(
    <BrowserRouter>
      <App routeList={routeList} />
    </BrowserRouter>,
    document.getElementById('root'));
}

let initialData = JSON.parse(decrypt(JSON.parse(document.getElementById('ssrTextInitData').value).initialData));
let targetRoute = matchRoute(document.location.pathname);
window.__INITIAL_DATA__ = initialData;

if (targetRoute) {
  targetRoute.initialData = initialData;
  if (targetRoute.component[proConfig.asyncComponentKey]) {
    targetRoute.component().props.load().then(res => {
      renderDom();
    });
  }
} else {
  renderDom();
}

//开发环境才会开启
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

