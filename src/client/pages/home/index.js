import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import { Button } from '@material-ui/core';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import PostCard from 'src/componentCommon/post-card/';
import css from './style.scss';

//组件
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  static state() {
    return (
      {
        postData: {
          datas: [],
          page: {}
        },
        page: {}
      }
    )
  }

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  toDetail = id => {
    this.props.history.push('/post/' + id);
  }

  getMore = () => {
    const { postData } = this.props.initialData;
    const wrapBottom = this.scrolWrap.getBoundingClientRect().bottom;
    const contentBottom = this.scrolContent.getBoundingClientRect().bottom;

    if(wrapBottom === contentBottom){
      if(postData.page.pageCount === postData.page.currentPage) return;
      if(this.state.loading) return;
      this.setState({loading:true})
      this.props.getMorePosts({pageNO: postData.page.nextPage}).then(res => {
        this.setState({loading:false})
      });
    }
  }

  render() {
    const { postData } = this.props.initialData;
    const { loading } = this.state;
    return (
      <div className='home-page' 
        onScroll={this.getMore}
        ref={(ref) => this.scrolWrap = ref}
      >
        {!postData || !postData.datas || !postData.datas.length ?
          '暂无数据'
          :
          <ul className='user-list' ref={(ref) => this.scrolContent = ref}>
            {postData.datas.map((item, idx) => <PostCard key={item.postId} item={item} toDetail={this.toDetail} />)}
            {loading && <li>加载中...</li>}
          </ul>
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