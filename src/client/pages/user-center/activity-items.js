import React from 'react';
import { timeTransfor, openInNewTab } from 'src/utils/helper';
import { Avatar } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';

const CommonCard = post => (
  <div className='reference-post-block'>
    <div className='reference-post-block-header'>
      <Avatar className='reference-author-avater' src={post.author.avatar} />
      <div className='reference-author-info'>
        <span className='reference-author-name'>{post.author.username}</span>
        <span className='reference-edit-date'>
          {post.author.jobTitle || '无'}
          <span className='split-point'>&#8901;</span>
          <span>{timeTransfor(new Date(post.createdAt))}</span>
        </span>
      </div>
    </div>
    <div className='reference-post-mian' onClick={() => openInNewTab('/post/'+post._id,true)}>
      <header>{post.title}</header>
      <div className='post-text-content'>
        <p>{post.main.length <= 120 ? post.main : post.main.substr(0, 120)}...</p>
        {
          post.headerBg ? <img src={post.headerBg + '?x-oss-process=style/list-bg'} /> : ''
        }
      </div>
    </div>

    <div className='reference-post-activity'>
      <span><VisibilityIcon />{post.read}</span>
      <span><ThumbUpIcon />{post.likes}</span>
      <span><ChatBubbleIcon />{post.comments}</span>
    </div>
  </div>
)

const LikePostItem = ({ data }) => (
  <div className='like-post-block common-post-block'>
    <header className='like-activty-header-block common-activty-header-block'><span>{data.user.username}</span>赞了这篇文章</header>
    {CommonCard(data.likePost)}
  </div>
)

const CommentItem = ({ data }) => (
  <div className='comment-post-block common-post-block'>
    <div className='comment-activty-header-block common-activty-header-block'>
      <header><span>{data.user.username}</span>评论了这篇文章</header>
      <div className='comment-content'>“{data.addComment.replyToUser && <Link onClick={() => openInNewTab('/user/'+data.addComment.replyToUser._id,true)}>@{data.addComment.replyToUser.username}</Link>} {data.addComment.body}”</div>
    </div>

    {CommonCard(data.addComment.post)}
  </div>
)

const PublishPostItem = ({ data }) => (
  <div className='publish-post-block common-post-block'>
    <header className='publish-activty-header-block common-activty-header-block'><span>{data.user.username}</span>发布了新文章</header>
    {CommonCard(data.publish)}
  </div>
)

const CollectionPostItem = ({ data }) => (
  <div className='collection-post-block common-post-block'>
    <header className='collection-activty-header-block common-activty-header-block'><span>{data.user.username}</span>收藏了这文章</header>
    {CommonCard(data.collectionPost)}
  </div>
)

const FollowAuthorItem = ({ data }) => (
  <div className='follow-author-block'>
    <Avatar className='follow-from-user-avater' src={data.user.avatar} />
    <div className='follow-details-block'>
      <span className='follow-info'>{data.user.username} <span>关注了</span> <Link onClick={() => openInNewTab('/user/'+data.followAuthor._id,true) }>{data.followAuthor.username}</Link></span>
      <span className='user-job'>{'无'}</span>
    </div>
  </div>
)

export {
  CommonCard,
  LikePostItem,
  CommentItem,
  PublishPostItem,
  CollectionPostItem,
  FollowAuthorItem
}