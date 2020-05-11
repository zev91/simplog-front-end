import React, { Component, useState } from 'react';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Link, Avatar, Button } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyInput from './reply-input';
import Comfirm from 'src/componentCommon/confirm';
import Toast from 'src/componentCommon/toast'
import css from './comments-lists.scss';

const Commentitem = ({ setVisible, setPid, parentId, _id, likeCount, fromUser, replyToUser, currentUser, isAuthor, body, createdAt, setReply, deleteComment, getComment, match }) => {
  function handlerReply() {
    if(!currentUser._id){
      Toast.error('请先登录!');
      return;
    }
    setPid(parentId || _id);
    setVisible(true);
    // setReply(parentId ? { id: fromUser._id, name: fromUser.username } : {});
    setReply({ id: fromUser._id, name: fromUser.username });

  }

  return (
    <div className='comment-cell-item'>
      <Avatar alt='avatar' src={fromUser.avatar}/>
      <div className='comment-content'>
        <div className='auth-info'>{fromUser.username} {isAuthor ? <span className='is-author'>作者</span> : ''} {replyToUser && replyToUser.username ? <span>回复 <Link>{replyToUser.username}</Link>:</span> : ''}</div>
        <div className='comment-date'>{moment(createdAt).format("YYYY.MM.DD HH:mm:ss")}</div>
        <div className='comment-body'>{body}</div>
        <div className='comment-op-wrap'>
          <span onClick={handlerReply}><ChatBubbleIcon />回复</span>

          {
            currentUser._id === fromUser._id
            &&
            <Comfirm header={`确定删除该条评论？`} click={deleteComment.bind(null,_id)} successCb={() => getComment(match.params.id)}>
              <span className='delete-op'><DeleteIcon />删除</span>
            </Comfirm>
          }
        </div>
      </div>
    </div>
  )
}

const RenderComments = ({ comment, currentUser, createComment, deleteComment, getComment, match }) => {

  const [visible, setVisible] = useState(false);
  const [pid, setPid] = useState('');
  const [reply, setReply] = useState({});


  return (
    <div className='comment-cell'>
      <Commentitem
        {...comment}
        setVisible={setVisible}
        setPid={setPid}
        setReply={setReply}
        currentUser={currentUser}
        deleteComment={deleteComment}
        getComment={getComment}
        match={match}
      />
      {
        comment.children.length
          ?
          comment.children.map(item => (
            <Commentitem
              key={item._id}
              {...item}
              setVisible={setVisible}
              setPid={setPid}
              setReply={setReply}
              currentUser={currentUser}
              deleteComment={deleteComment}
              getComment={getComment}
              match={match}
            />
          ))
          :
          ''
      }

      <div className='reply-input-wrap'>
        <ReplyInput
          getComment={getComment}
          visible={visible}
          setVisible={setVisible}
          createComment={createComment}
          id={match.params.id}
          parentId={pid}
          reply={reply}
        />
      </div>
    </div>
  )
}

class CommentsLists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { comments } = this.props;
    return (
      <div className='comments-lists-wrap'>
        <h3 className='comments-lists-header'>全部评论</h3>
        {
          comments.map(comment => <RenderComments key={comment._id} {...this.props} comment={comment} />)
        }
      </div>
    )
  }
}

export default withStyles(css)(CommentsLists);