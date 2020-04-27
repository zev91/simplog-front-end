import React, { Component } from 'react';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteIcon from '@material-ui/icons/Delete';
import css from './comments-lists.scss';

const Commentitem = ({ _id, likeCount, user, isAuthor, username, body, createdAt, chilren }) => (
    <div className='comment-cell-item'>
      <Avatar>{username[0].toUpperCase()}</Avatar>
      <div className='comment-content'>
        <div className='auth-info'>{username} {isAuthor ? <span>作者</span>:''}</div>
        <div className='comment-date'>{moment(createdAt).format("YYYY.MM.DD HH:mm:ss")}</div>
        <div className='comment-body'>{body}</div>
        <div className='comment-op-wrap'>
          <span><ChatBubbleIcon />回复</span>
          <span className='delete-op'><DeleteIcon />删除</span>
        </div>
      </div>
    </div>
)

const RenderComments = (comment) => (
  <div className='comment-cell'>
    <Commentitem {...comment}/>
    {
      comment.children.length ? comment.children.map(item => <Commentitem {...item}/>) : ''
    }
  </div>
)

class CommentsLists extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className='comments-lists-wrap'>
        <h3 className='comments-lists-header'>全部评论</h3>
        {
          comments.map(comment => <RenderComments {...comment} />)
        }
      </div>
    )
  }
}

export default withStyles(css)(CommentsLists);