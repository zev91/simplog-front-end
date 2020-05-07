import React from 'react';
import { timeTransfor } from 'src/utils/helper';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default ({ toDetail, item }) => {
  return (
    <li className="post-preview-card" onClick={toDetail.bind(this, item._id)}>
      <div className='post-text-area'>
        <div className='post-info'>
          <span>{item.author.username}
            <span className='split-point'>&#8901;</span>
          </span>
          <span>{timeTransfor(new Date(item.createdAt))}
          <span className='split-point'>&#8901;</span>
          </span>
          <span>{item.category+'/'+item.tags.join('/')}</span>
        </div>
        <h2 className="post-title">
          {item.title}
        </h2>
        <div className='active-info'>
          <span><VisibilityIcon/>{item.read}</span>
          <span><ThumbUpIcon/>{item.likes}</span>
          <span><ChatBubbleIcon/>{item.comments}</span>
        </div>
      </div>

      <div className='post-header-bg'>
        {item.headerBg ? <img src={`${item.headerBg}?x-oss-process=style/list-bg`}/> : <div className='no-bg'></div>}
      </div>
      <hr />
    </li>
  )
}