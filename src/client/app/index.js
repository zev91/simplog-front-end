import React, { useEffect, useState } from 'react';
import Layout from './layout';
import { updateLocation } from 'src/utils/redux/location'

import { Route, Switch, withRouter } from 'react-router-dom';


import withStyles from 'isomorphic-style-loader/withStyles';

import css from './layout.scss';

const noHeaderList = ['/register', '/login', '/editor/post/:id', '/editor/draft/:id']

function App({ routeList, history }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      setCount(count + 1);
      updateLocation(window.__STORE__)(history.location)
      history.listen((args) => {
        updateLocation(window.__STORE__)(args)
      })
    }
  });


  function hasHeader(item) {
    return noHeaderList.indexOf(item.path) === -1;
  }

  function noHeader(item) {
    return noHeaderList.indexOf(item.path) > -1;
  }

  return (

      <Switch>
        {
          routeList.filter(noHeader).map(item => {
            return <Route key={item.path} {...item}></Route>
          })
        }
        <Layout>
          {
            routeList.filter(hasHeader).map(item => {
              return <Route key={item.path} {...item}></Route>
            })
          }
        </Layout>
      </Switch>
  );
}

export default withStyles(css)(withRouter(App));
// export default App;