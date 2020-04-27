import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/withStyles';
import CommentsInput from './comments-input';
import css from './comments.scss';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='post-comments'>
        <div className='main-comment-input-wrap'>
          <Avatar>H</Avatar>
            <CommentsInput 
              type='post' 
              createComment={this.props.createComment}
              getComment={this.props.getComment}
              id={this.props.match.params.id}
            />
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(css)(Comments))