import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './app';
import routeList, { matchRoute } from '../router';
import { decrypt } from '../utils/helper';


let initialData = decrypt(JSON.parse(document.getElementById('ssrTextInitData').value).initialData);
let route = matchRoute(document.location.pathname);

if(route){
  route.initialData = initialData;
}

ReactDom.hydrate(
  <BrowserRouter>
    <App routeList={routeList}/>
  </BrowserRouter>,
 document.getElementById('root'));

 //开发环境才会开启
if (process.env.NODE_ENV==='development' &&  module.hot) {
  module.hot.accept();
}

