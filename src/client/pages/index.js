import React from 'react';
import { setInitData } from 'src/utils/helper';
import Tdk from 'src/components/tdk';

export default class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = setInitData({ page: {} }, props)
    }

    static async getInitialProps() {
      return ({
        page: {
          tdk: {
            title: '首页',
            keywords: '前端技术首页',
            description: '前端技术首页'
          }
        }
      });
    }

    componentDidMount() {
      if (!this.state.page.tdk) {//判断是否有初始化数据
        Index.getInitialProps().then(({page }) => {
          this.setState({page});
        })
      }
    }

   handlerClick(){
      console.log('点击事件测试=======>>>> click');
   }

    render() {
        return (
          <div>
            <Tdk {...this.state.page.tdk} />
            <h1 onClick={this.handlerClick}>This is Home page hahhahah!</h1>
          </div>
        ) 
    }
}