import React from 'react';
import { connect } from 'react-redux';
import withInitialData from 'src/componentHOC/with-initial-data';
import { actions } from './redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import css from './style.scss';

class Index extends React.Component {
    constructor(props) {
      super(props);
    }

    static state () {
      return (
        { page: {} } 
      )
    }
    static async getInitialProps({store}) {
      return store.dispatch(actions.getInitialData());
  }

   handlerClick(){
      console.log('点击事件测试=======>>>> click');
   }

    render() {
        return (
          <div className='home-page-wrap'>
            <h1 onClick={this.handlerClick}>This is Home page hahhahah!</h1>
          </div>
        ) 
    }
}

const mapStateToProps = state => ({
  initialData: state.homePage,
});

//将获取数据的方法也做为 props传递给组件

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, actions,null)
) (Index); 