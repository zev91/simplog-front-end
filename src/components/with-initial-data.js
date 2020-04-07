import React, { Component } from 'react';
import { decrypt } from 'src/utils/helper';
import Tdk from 'src/components/tdk';

let _this = null;

const popStateCallback = () => {
  // 使用popStateFn保存函数防止addEventListener重复注册
  if (_this && _this.getInitialProps) {
    _this.getInitialProps();
  }
};


export default SourceComponent => {
  return class HocComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        initialData: {},
        canClientFetch: false //浏览器端是否需要请求数据
      }
    }

    static async getInitialProps(ctx) {
      return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(ctx) : {};
    }

    async getInitialProps() {
      const props = this.props;
      const store = window.__STORE__;//从全局得到 store 

      const res = props.getInitialData ? await props.getInitialData(store.dispatch) : (
        SourceComponent.getInitialProps ? await SourceComponent.getInitialProps() : {}
      );
      this.setState({
        initialData: res,
        canClientFetch: true
      });
    }

    async componentDidMount() {
      _this = this; // 修正_this指向，保证_this指向当前渲染的页面组件
      //注册事件，用于在页面回退的时候触发
      // window.__IS__SSR && window.addEventListener('popstate', popStateCallback);
      // const canClientFetch = this.props.history && this.props.history.action === 'PUSH';
      // if (canClientFetch || !window.__IS__SSR) {
      //   await this.getInitialProps();
      // }

      window.addEventListener('popstate', popStateCallback);
      const canClientFetch = this.props.history && this.props.history.action === 'PUSH';//路由跳转的时候可以异步请求数据
      if (canClientFetch) {
        //如果是 history PUSH 操作 则更新数据
        await this.getInitialProps();
      }
    }

    render() {
      const props = {
        initialData: {},
        ...this.props
      };

      // if (__SERVER__) {
      //   props.initialData = JSON.parse(decrypt(props.staticContext.initialData));
      // } else {
      //   //客户端渲染
      //   if (this.state.canClientFetch) {//需要异步请求数据
      //     props.initialData = this.state.initialData || {};
      //   } else {
      //     props.initialData = window.__INITIAL_DATA__;
      //     window.__INITIAL_DATA__ = {};//使用过后清除数据,否则其他页面会使用
      //   }
      // }
     console.log(' this.state.canClientFetch==>>',this.state.canClientFetch)
      if (this.state.canClientFetch) {//需要异步请求数据
        props.initialData = this.state.initialData || {};
      } else {
        props.initialData = this.props.initialData;
      }

      if (JSON.stringify(props.initialData) === '{}') {
        props.initialData = SourceComponent.state();
      }
       console.log('props.initialData====>>>',props.initialData)
      return (
        <div>
          <Tdk {...props.initialData.page.tdk} />
          <SourceComponent  {...props}></SourceComponent>
        </div>
      )
    }
  }
}