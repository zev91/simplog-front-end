import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { timeTransfor } from 'src/utils/helper';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Comfirm from 'src/componentCommon/confirm';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import withListenerScroll from 'src/componentHOC/withListenerScroll';


class MyPost extends Component {
  constructor(props) {
    super(props);
  }
  static method = 'getUserPosts';
  editPost = () => { }

  deletePost = async (popupState, id) => {
    const res = await this.props.deletePost(id);
    console.log(res);
    popupState.close();
    this.getPosts();
    // console.log(popupState)
  }

  render() {
    const { userInfo, datas } = this.props;

    return (
      <div className='my-posts-wrap'>
        {
          datas.map(post => (
            <div className='my-post-block'>
              <div className='block-header'>
                {post.author.avatar ? <Avatar alt="avatar" src={post.author.avatar} /> : <Avatar><PersonIcon /></Avatar>}
                {post.author.username}
                <span className='split-point'>&#8901;</span>
                <span>{timeTransfor(new Date(post.createdAt))}</span>
              </div>
              {post.headerBg && <div className='post-header-bg'><img src={post.headerBg + '?x-oss-process=style/user-post-header-bg'} /></div>}
              <div className='block-content'>
                <header>{post.title}</header>
                <div className='post-main'>{post.main}</div>
              </div>

              <div className='post-bottom-block'>
                <div className='post-active-info'>
                  <span><VisibilityIcon />{post.read}</span>
                  <span><ThumbUpIcon />{post.likes}</span>
                  <span><ChatBubbleIcon />{post.comments}</span>
                </div>
                <div className='more-op'>
                  {
                    userInfo._id === post.author._id
                    &&
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
                            <MenuItem onClick={this.editPost}>编辑</MenuItem>
                            <Comfirm header={`确定删除该文章？`} click={this.deletePost.bind(null, popupState, post.id)} successCb={this.getPost}>
                              <MenuItem >删除</MenuItem>
                            </Comfirm>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  }

                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}


export default withListenerScroll(MyPost);