import React from 'react';
import withInitialData from 'src/components/with-initial-data';
class Index extends React.Component {
    constructor(props) {
      super(props);
    }

    static state () {
      return (
        { page: {} } 
      )
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

   handlerClick(){
      console.log('点击事件测试=======>>>> click');
   }

    render() {
        return (
          <div>
            <h1 onClick={this.handlerClick}>This is Home page hahhahah!</h1>
          </div>
        ) 
    }
}

export default withInitialData(Index)