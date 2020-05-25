import React, { Component } from 'react';
import { openInNewTab } from 'src/utils/helper';
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
            if(data.activeType === 'LIKE_POST') return <LikePostItem key={data.id} data={data}/>;
            if(data.activeType === 'COMMENT') return <CommentItem key={data.id} data={data}/>;
            if(data.activeType === 'PUBLISH') return <PublishPostItem key={data.id} data={data}/>;
            if(data.activeType === 'COLLECTION') return <CollectionPostItem key={data.id} data={data}/>;
            if(data.activeType === 'FOLLOW') return <FollowAuthorItem key={data.id} data={data}/>;
          })
        }
      </div>
    )
  }
}

export default withListenerScroll(MyActivities);