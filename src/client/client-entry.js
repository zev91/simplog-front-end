import React from 'react';
import ReactDom from 'react-dom';
// import { browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from './app';
import routeList, { matchRoute } from '../router';
import { decrypt } from '../utils/helper';
import proConfig from '../share/pro-config';

import { Provider } from 'react-redux';
import getStore from '../share/redux/store';

const createBrowserHistory = require("history").createBrowserHistory
export const history = createBrowserHistory({ basename: '/' })

// console.log('browserHistory====>>>>',browserHistory);

let initialData = JSON.parse(decrypt(JSON.parse(document.getElementById('ssrTextInitData').value).initialData));
let targetRoute = matchRoute(document.location.pathname);

window.__INITIAL_DATA__ = initialData;

function renderDom() {
  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());//客户端执行，插入style
    return () => removeCss.forEach(dispose => dispose());//组件卸载时 移除当前的 style 标签
  }

  const store = getStore(initialData);
  //将store 放入全局，方便后期的使用
  window.__STORE__ = store;
  

  ReactDom.hydrate(
    <Provider store={store}>
      <StyleContext.Provider value={{ insertCss }}>
        <BrowserRouter>
          <App routeList={routeList} />
        </BrowserRouter>
      </StyleContext.Provider>
    </Provider>,
    document.getElementById('root'));
}

if (targetRoute) {
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

