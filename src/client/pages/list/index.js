import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import { Button } from '@material-ui/core';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import css from './style.scss';

//组件
class List extends React.Component {
  constructor(props) {
    super(props);
  }

  static state() {
    return (
      { postData:{
        datas:[],
        page:{}
      }, 
      page: {} }
    )
  }

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  handlerClick = () => {
    console.log(this.props)
  }

  toDetail = id => {
    this.props.history.push('/post/'+id);
    console.log(id,this.props)
  }

  render() {
    const { postData } = this.props.initialData;
    console.log(postData)
    return (
      <div>
        <Button color="primary" variant="contained" onClick={this.handlerClick}>加载</Button>
        {!postData || !postData.datas || !postData.datas.length ?
          '暂无数据'
          :
          <ul className='user-list'>
            {postData.datas.map(((item, idx) => {
              return (
                <li key={item.postId} onClick={this.toDetail.bind(this,item._id)}>
                  {item.title}
                </li>
              )
          }))}</ul>
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  initialData: state.listPage,
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(List); 