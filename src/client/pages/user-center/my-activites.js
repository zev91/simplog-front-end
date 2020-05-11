import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { timeTransfor, openInNewTab } from 'src/utils/helper';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Comfirm from 'src/componentCommon/confirm';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { LikePostItem, CommentItem, PublishPostItem, CollectionPostItem, FollowAuthorItem } from './activity-items';

import withListenerScroll from 'src/componentHOC/withListenerScroll';

class MyActivities extends Component {
  constructor(props) {
    super(props);
  }
  static method = 'getActivites';

  deletePost = async (popupState, id) => {
    const res = await this.props.deletePost(id);
    const { params } = this.props.match;
    popupState.close();
    this.props.refreshDatas();
  }

  switchDetail = (id) => {
    openInNewTab('/post/'+id,true);
  }

  editPost = (id) => {
    openInNewTab('/editor/post/'+id,true);
  }

  render() {
    const { userInfo, datas } = this.props;

    return (
      <div className='my-activites-wrap'>
        {
          datas.map(data => {
            if(data.activeType === 'LIKE_POST') return <LikePostItem data={data}/>;
            if(data.activeType === 'COMMENT') return <CommentItem data={data}/>;
            if(data.activeType === 'PUBLISH') return <PublishPostItem data={data}/>;
            if(data.activeType === 'COLLECTION') return <CollectionPostItem data={data}/>;
            if(data.activeType === 'FOLLOW') return <FollowAuthorItem data={data}/>;
          })
        }
      </div>
    )
  }
}


export default withListenerScroll(MyActivities);