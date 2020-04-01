import React from 'react';
import { StaticRouter, Route} from 'react-router';
import App from '../client/app/index';
// import routeList from '../router';

export default ({location,context,routeList}) => 
    <StaticRouter location={location} context={context}>
          <App routeList={routeList}></App>
    </StaticRouter>
;


