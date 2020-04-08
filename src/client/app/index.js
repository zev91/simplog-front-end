import React, { useEffect, useState }from 'react';
import Layout from './layout';
import { updateLocation } from 'src/utils/redux/location'

import { Route, Switch, withRouter } from 'react-router-dom';

function App({ routeList,history }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if(count === 0){
      setCount(count + 1);
      updateLocation(window.__STORE__)(history.location)
      history.listen((args) => {
      updateLocation(window.__STORE__)(args)
      })
    }
  });
  
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

export default withRouter(App);
// export default App;