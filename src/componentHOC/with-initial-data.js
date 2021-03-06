import React, { Component } from 'react';
import { decrypt } from 'src/utils/helper';
import Tdk from 'src/componentCommon/tdk';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    static async getInitialProps(props) {
      return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps(props) : {};
    }

    async getInitialProps() {
      const props = this.props;
      // const store = window.__STORE__;//从全局得到 store 

      const initialData = props.getInitialData ? await props.getInitialData() : (
        SourceComponent.getInitialProps ? await SourceComponent.getInitialProps() : {}
      );

      this.setState({
        initialData,
        canClientFetch: true
      });
    }

    async componentDidMount() { //客户端渲染会执行
      _this = this; // 修正_this指向，保证_this指向当前渲染的页面组件
      window.addEventListener('popstate', popStateCallback);
      const canClientFetch = this.props.history && (this.props.history.action === 'PUSH');//路由跳转的时候可以异步请求数据
      if (canClientFetch) {
        //如果是 history PUSH 操作 则更新数据
        try {
          this.setState({ loading: true });
          await this.getInitialProps();
        } finally {
          this.setState({ loading: false });
        }
      }
    }

    render() {
      const { loading } = this.state;
      const props = {
        initialData: {},
        ...this.props
      };

      if (this.state.canClientFetch) {//需要异步请求数据
        props.initialData = this.state.initialData || {};
      } else {
        props.initialData = this.props.initialData;
      }

      props.initialData = this.props.initialData;

      if (JSON.stringify(props.initialData) === '{}') {
        props.initialData = SourceComponent.state();
      }
      return (
        loading ?
          <Backdrop className='async-loading' open={true} >
            <CircularProgress color="primary" />
            <span className='loading-tips'>数据加载中...</span>
          </Backdrop>
          :
          <div>
            <Tdk {...props.initialData.page.tdk} />
            <SourceComponent  {...props}></SourceComponent>
          </div>
      )
    }
  }
}