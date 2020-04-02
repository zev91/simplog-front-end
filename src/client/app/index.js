import Layout from './layout';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App({ routeList }) {
  return (
    <Layout>
      <Switch>
        {
          routeList.map(item => {
            return <Route key={item.path} {...item}></Route>
          })
        }
      </Switch>
    </Layout>
  );
}

export default App;