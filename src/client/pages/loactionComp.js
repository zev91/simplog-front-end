import React from 'react';

//组件
class LoactionComp extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ store, req }) {
    const { query, path } = req;
     await store.dispatch({
        type: 'LOCATION_CHANGE',
        payload: {
          pathname:path,
          search:query,
          hash:"",
        }
      });
      return store
  }

  render() {
    return (<div></div>)
  }
}

export default LoactionComp;