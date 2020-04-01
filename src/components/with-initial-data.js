import React, { Component } from 'react';

export default sourceComponent => {
  return class HocComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        initialData: {},
        canClientFetch: false //浏览器端是否需要请求数据
      }
    }

    static async getInitialProps() {
      return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps() : {};
    }

    async getInitialProps() {
      const initialData = SourceComponent.getInitialProps ? await SourceComponent.getInitialProps() : {};
      this.setState({
        initialData,
        canClientFetch: true
      });
    }

    async componentDidMount() {
      const canClientFetch = this.props.history && this.props.history.action === 'PUSH';
      if (canClientFetch) {
        await this.getInitialProps();
      }
    }


    render() {
      const props = {
        initialData: {},
        ...this.props
      };

      

      if (__SERVER__) {
        props.initialData = JSON.parse(decrypt(props.staticContext.initialData)) || deepCopy(initState);
      } else {
       //客户端渲染
       if (this.state.canClientFetch) {//需要异步请求数据
        props.initialData = this.state.initialData||{};
    } else {
        props.initialData = window.__INITIAL_DATA__;

        window.__INITIAL_DATA__={};//使用过后清除数据,否则其他页面会使用
    }
      }

      if (JSON.stringify(initialData) === '{}') {
        initialData = initState;
      }

      // return initialData
      return <div>ssd</div>
    }
  }
}