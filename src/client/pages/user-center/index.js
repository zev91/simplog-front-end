import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import { Button } from '@material-ui/core';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import WorkIcon from '@material-ui/icons/Work';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import composeHOC from 'src/utils/composeHOC';
import emitter from 'src/utils/events';
import moment from 'moment';
import MyPost from './my-post';
import MyActivites from './my-activites';
import Follow from './follow';
import Collection from './collection';
import { openInNewTab } from 'src/utils/helper';
import Toast from 'src/componentCommon/toast';
import css from './style.scss';

function TabPanel({ menuValue, value, children }) {
  return (
    <div
      className='block-item'
      role="tabpanel"
      hidden={value !== menuValue}
      id={`scrollable-auto-tabpanel-${value}`}
      aria-labelledby={`scrollable-auto-tab-${value}`}
    >
      {menuValue === value && (
        <div>{children}</div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

//组件
class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuValue: 'post'
    }
  }

  static state() {
    return (
      {
        userInfo: {},
        page: {}
      }
    )
  }

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  handerFollow = async () => {
    const { currentUser, initialData } = this.props;
    const { _id } = initialData.userInfo;

    if (!currentUser._id) {
      Toast.error('请先登录！');
      return;
    }

    const res = await this.props.followauthor(_id);

    if (res && res.success) {
      this.props.getOtherUserInfo(_id);
      Toast.success(res.data.message);
    }
  }

  handlerTabChange = () => {
    const contentPosition = this.majorContent.getBoundingClientRect();
    const userViewPosition = this.userView.getBoundingClientRect();
    const scrollTop = contentPosition.top;

    if (userViewPosition.height - scrollTop + 65 >= contentPosition.height) {
      emitter.emit('scrollToBottom');
    }

    if (scrollTop <= -64) {
      this.tabsRef.classList.add('position-status')
    } else {
      this.tabsRef.classList.remove('position-status')
    }
  }

  ifFollowAuthor = () => {
    const { currentUser, initialData } = this.props;
    return initialData.userInfo.totalFollowTo && initialData.userInfo.totalFollowTo.findIndex(item => item.followFrom === currentUser._id) > -1;
  }

  handlerBtn = () => {
    const { currentUser, initialData } = this.props;
    if (currentUser._id === initialData.userInfo._id) {
      return <Button variant="outlined" color="secondary" onClick={() => openInNewTab('/users/setting', true)}>编辑个人资料</Button>
    }

    if (this.ifFollowAuthor()) {
      return <Button variant="outlined" color="secondary" onClick={this.handerFollow}>已关注</Button>
    }

    return <Button variant="outlined" color="secondary" onClick={this.handerFollow}>加关注</Button>
  }

  render() {
    const { userInfo } = this.props.initialData;
    const { menuValue } = this.state;

    return (
      <div className='user-center-page'>
        <main>
          <div className='user-view' ref={ref => this.userView = ref}>
            <div style={{ maxWidth: 708, width: '100%', position: 'relative' }}>
              <div className='major-area' onScroll={this.handlerTabChange} >
                <div className='major-content' ref={ref => this.majorContent = ref}>
                  <div className='itemscope shadow block'>
                    <div className='user-avater'>
                      <img src="userInfo.avatar" src={userInfo.avatar + '?x-oss-process=style/user-center-avatar'} />
                    </div>
                    <div className='user-info-box'>
                      <h1>{userInfo.username}</h1>
                      <span><WorkIcon />{userInfo.jobTitle || '无'}</span>
                    </div>
                    <div className='user-action-box'>
                      {this.handlerBtn()}
                    </div>
                  </div>

                  <div className='list-block block shadow'>
                    <div style={{ minHeight: 49, background: '#fff' }}>
                      <Tabs
                        value={menuValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(event, value) => this.setState({ menuValue: value })}
                        variant="fullWidth"
                        aria-label="user menu"
                        ref={ref => this.tabsRef = ref}
                        id='user-center-tabs'
                      >
                        <Tab label="文章" value='post' {...a11yProps(0)} />
                        <Tab label="动态" value='active' {...a11yProps(1)} />
                        <Tab label="关注" value='follow' {...a11yProps(2)} />
                        <Tab label="收藏" value='collection' {...a11yProps(3)} />
                      </Tabs>
                    </div>
                    <TabPanel value='post' menuValue={menuValue}>
                      <MyPost />
                    </TabPanel>
                    <TabPanel value='active' menuValue={menuValue}>
                      <MyActivites />
                    </TabPanel>
                    <TabPanel value='follow' menuValue={menuValue}>
                      <Follow />
                    </TabPanel>
                    <TabPanel value='collection' menuValue={menuValue}>
                      <Collection />
                    </TabPanel>
                  </div>
                </div>
              </div>
            </div>

            <div className='minor-area'>
              <div className='stat-block block shadow'>
                <div className='block-title'>个人成就</div>
                <div className='block-body'>
                  <div className='stat-item'>
                    <span><VisibilityIcon fontSize='small' color='primary' /> </span>
                    文章被阅读 {userInfo.totalReads}
                  </div>
                  <div className='stat-item'>
                    <span><ThumbUpIcon fontSize='small' color='primary' /> </span>
                    获得点赞 {userInfo.totalLikes}
                  </div>
                </div>
              </div>
              <div className='follow-block block shadow'>
                <div className='follow-item'>
                  <div className='item-title'>关注了</div>
                  <div className='item-count'>{userInfo.totalFollowFrom ? userInfo.totalFollowFrom.length : 0}</div>
                </div>
                <div className='follow-item'>
                  <div className='item-title'>专注者</div>
                  <div className='item-count'>{userInfo.totalFollowTo ? userInfo.totalFollowTo.length : 0}</div>
                </div>
              </div>
              <div className='more-block'>
                <div className='more-item'>
                  <div className='item-title'>加入于</div>
                  <div className='item-body'>{moment(userInfo.createdAt).format("YYYY-MM-DD")}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.userCenterPage,
  currentUser: state.userInfo
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(UserCenter); 