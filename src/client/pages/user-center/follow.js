import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { openInNewTab } from 'src/utils/helper';
import Divider from '@material-ui/core/Divider';
import withListenerScroll from 'src/componentHOC/withListenerScroll';

class Follow extends Component {
  constructor(props) {
    super(props);

  }

  static method = 'getFollowedUsers';

  deletePost = async (popupState, id) => {
    const res = await this.props.deletePost(id);
    const { params } = this.props.match;
    popupState.close();
    this.props.refreshDatas();
  }

  switchDetail = (id) => {
    openInNewTab('/post/' + id, true);
  }

  editPost = (id) => {
    openInNewTab('/editor/post/' + id, true);
  }

  render() {
    const { userInfo, datas, followType } = this.props;

    return (
      <div className='follow-author-list-wrap'>
        <div className='follow-type-switch'>
          <span className={followType === 'FOLLOW_TO' || followType === '' ? 'active' : ''} onClick={this.props.changeFollowType.bind(this, 'FOLLOW_TO')}>关注了</span>
          <Divider orientation="vertical" />
          <span className={followType === 'FOLLOW_FROM' ? 'active' : ''} onClick={this.props.changeFollowType.bind(this, 'FOLLOW_FROM')}>关注者</span>
        </div>
        {
          datas.map(data => (
            <div key={data._id} className='follow-author-list-item'>
              <div className='list-left' onClick={() => openInNewTab('/user/' + data.user._id, true)}>
                <Avatar className='reference-author-avater' src={data.user.avatar} />
                <div className='reference-author-info'>
                  <span className='user-name'>{data.user.username}</span>
                  <span className='job-title'>{data.user.jobTitle || '无'}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default withListenerScroll(Follow);