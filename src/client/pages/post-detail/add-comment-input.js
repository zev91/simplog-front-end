import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import PersonIcon from '@material-ui/icons/Person';
import CommentInput from './comment-input';
import css from './comments.scss';

class AddCommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getAvatar = () => {
    if(!this.props.currentUser.avatar) return 'https://simplog.oss-cn-beijing.aliyuncs.com/system/unlogin-avatar.svg';
    return this.props.currentUser.avatar;
  }

  render() {
    return (
      <div className='post-comments'>
        <div className='main-comment-input-wrap'>
          <Avatar src={this.getAvatar()}/>
          <CommentInput 
            currentUser={this.props.currentUser}
            createComment={this.props.createComment}
            getComment={this.props.getComment}
            id={this.props.match.params.id}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(css)(AddCommentInput))