import React, { Component,createRef } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { IconButton, Button, Popover, ButtonBase, Input, Chip, Divider } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import css from './publish-post.scss';

class PublishPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
    this.tagInput = createRef();
  }
  handleDelete = deleTag => {
    const { tags } =this.state;
    this.setState({
      tags: tags.filter(tag => tag !== deleTag)
    })
  }
  handlerAddTag = e => {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
      const { tags, tagInputValue } =this.state;
      this.setState({
        tags: Array.from(new Set([...tags,tagInputValue]))
      },() => {
          this.setState({
            tagInputValue:''
          })
      })
   }
  }
  render() {
    const { tags, tagInputValue } = this.state;
    console.log(tags)
    return (
      <PopupState variant="popover" popupId="publish-post-img-popup-popover">
        {(popupState) => (
          <div className='publish-post-content'>
            <Button className='publish-post-op-btn' color="primary" endIcon={popupState.isOpen ? <ArrowDropUp /> : <ArrowDropDown />} {...bindTrigger(popupState)}>发布</Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className='public-content'>
                <div className='title'>发布文章</div>
                <div className='tags-wrap'>
                  <header>标签</header>
                  <Input 
                    ref={this.tagInput}
                    placeholder='输入内容 按下回车以添加标签' 
                    fullWidth  
                    disabled={tags && tags.length >=10}
                    inputProps={{ 'aria-label': 'description' }} 
                    onChange={e => {
                      this.setState({tagInputValue: e.target.value})
                    }}
                    value={tagInputValue}
                    onKeyUp={this.handlerAddTag}
                    />
                  <div className='tags-list'>
                    {
                      tags.map(tag => <Chip key={tag} label={tag} variant="outlined" onDelete={this.handleDelete.bind(this,tag)} color="primary" />)
                    }
                   
                  </div>

                  <Divider />
                  
                  <div className='post-submit-content'>
                    <Button variant="contained" color="primary" disableElevation>
                      确定并发布
                    </Button>
                  </div>
                </div>

              </div>
            </Popover>
          </div>
        )
        }
      </PopupState>
    )
  }
}

export default withStyles(css)(PublishPost)