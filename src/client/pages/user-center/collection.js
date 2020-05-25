import React, { Component } from 'react';
import { openInNewTab } from 'src/utils/helper';
import withListenerScroll from 'src/componentHOC/withListenerScroll';
import { CommonCard } from './activity-items';

class MyCollection extends Component {
  constructor(props) {
    super(props);
  }
  static method = 'getUserCollections';

  switchDetail = (id) => {
    openInNewTab('/post/'+id,true);
  }

  editPost = (id) => {
    openInNewTab('/editor/post/'+id,true);
  }

  render() {
    const { userInfo, datas } = this.props;
    return (
      <div className='my-collection-wrap'>
        {
          datas.map(data => <div key={data.id} className='common-post-block'>{CommonCard(data.post)}</div>)
        }
      </div>
    )
  }
}

export default withListenerScroll(MyCollection);