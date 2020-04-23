import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import moment from 'moment';


import marked from 'marked';
import hljs from 'highlight.js';
import languageList from 'src/componentCommon/editor/language-list';

import css from './style.scss';

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, languageList).value;
  }
});

//组件
class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.headerRef = createRef();
  }

  static state() {
    return (
      { page: {} }
    )
  }
  

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  onScoll = () => {
    const appHeader = document.getElementsByClassName('app-header')[0];
    const height = this.headerRef.current.getBoundingClientRect().height;
    const scrollTop = document.documentElement.scrollTop;

    if(scrollTop > height){
      appHeader.classList.add('header-visible');
    }else{
      appHeader.classList.remove('header-visible');
    }
  }

  componentDidMount(){
    window.addEventListener('scroll',this.onScoll.bind(this));
  }
  componentWillUnmount(){
    document.getElementsByClassName('app-header')[0].classList.remove('header-visible');
    window.removeEventListener('scroll',this.onScoll.bind(this));
  }

  render() {
    const { post } =this.props;
    return (
      [
        <div 
          ref={this.headerRef}
          className='post-detail-header' 
          style={{
            background: `#808080 url(${post.headerBg+'?x-oss-process=style/post-header-bg'}) center no-repeat`,
            backgroundSize: 'cover'
            }}
        >
          <div className='container'>
            <div className='post-heading'>
              <h1>{post.title}</h1>
              <span className='meta'>
                作者 {post.username}
                <span>日期 {moment(post.createdAt).format("YYYY-MM-DD")}</span>
              </span>

              <div className='post-tags'>
                {
                  post.tags.map((tag,idx) => <span key={tag+idx} className='tag-item'>{tag}</span>)
                }
              </div>
            </div>
          </div>
        </div>,
        <div className='preview-content post-detail'>
          <div className='preview-content-html'>
            <div dangerouslySetInnerHTML={{ __html: marked(post.body, { breaks: true }) }} />
          </div>
        </div>
      ]
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.postDetailPage,
  post: state.postDetailPage.data.post
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(PostDetail); 