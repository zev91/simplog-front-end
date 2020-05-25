import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import { openInNewTab } from 'src/utils/helper';
import composeHOC from 'src/utils/composeHOC';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Comfirm from 'src/componentCommon/confirm';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Empty from 'src/componentCommon/empty';
import moment from 'moment';
import css from './style.scss';

//组件
class DraftList extends React.Component {
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

  editPost = (popupState, id) => {
    popupState && popupState.close();
    openInNewTab('/editor/draft/' + id, true);
  }

  deletePost = async (popupState, id) => {
    popupState.close();
    await this.props.deletePost(id);
    this.props.updateListt(id);
  }

  getMore = () => {
    const { draftData } = this.props.initialData;
    const wrapBottom = this.scrolWrap.getBoundingClientRect().bottom;
    const contentBottom = this.scrolContent.getBoundingClientRect().bottom;

    if (wrapBottom >= contentBottom) {
      if (draftData.page.pageCount === draftData.page.currentPage) return;
      if (this.state.loading) return;
      this.setState({ loading: true })
      this.props.getMoreDrafts({ pageNO: draftData.page.nextPage }).then(res => {
        this.setState({ loading: false })
      });
    }
  }

  render() {
    const { draftData } = this.props.initialData;
    const { loading } = this.state;
    return (
      <div className='draft-page'
        onScroll={this.getMore}
        ref={(ref) => this.scrolWrap = ref}
      >
        {!draftData || !draftData.datas || !draftData.datas.length ?
          <Empty />
          :
          <ul className='draft-list-block' ref={(ref) => this.scrolContent = ref}>
            {draftData.datas.map((item, idx) => (
              <li className='draft-list-item' key={item.id}>
                <header onClick={this.editPost.bind(null, null, item.id)}>{item.title || '无标题'}</header>
                <div className='info-box'>
                  <span>{moment(item.createdAt).format("YYYY-MM-DD HH:mm")}</span>
                  <PopupState variant="popover" popupId="more-menu-popup">
                    {(popupState) => (
                      <React.Fragment>
                        <IconButton aria-label='more' {...bindTrigger(popupState)}>
                          <MoreVertIcon size='small' />
                        </IconButton>

                        <Menu
                          {...bindMenu(popupState)}
                          getContentAnchorEl={null}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                          <MenuItem onClick={this.editPost.bind(null, popupState, item.id)}>编辑</MenuItem>
                          <Comfirm header={`确定删除该草稿？`} click={this.deletePost.bind(null, popupState, item.id)} successCb={this.getPost}>
                            <MenuItem >删除</MenuItem>
                          </Comfirm>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </div>
              </li>
            ))}
            {loading && <li>加载中...</li>}
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.draftPage,
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(DraftList); 