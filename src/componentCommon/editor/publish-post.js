import React, { Component,createRef } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { IconButton, Button, Popover, ButtonBase, Input, Chip, Divider } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Toast from 'src/componentCommon/toast'
import { postCategorys } from 'utils/jsonSource';
import css from './publish-post.scss';

class PublishPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tagInputValue:'',
      pubText : props.published ? '更新' : '发布'
    }
    this.tagInput = createRef();
  }
  handleDelete = deleTag => {
    const { tags } = this.props;
    this.props.updatePostAndCb({tags: tags.filter(tag => tag !== deleTag)});
  }

  handlerAddTag = e => {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
      const { tagInputValue } =this.state;
      const { tags } =this.props;

      this.props.updatePostAndCb({tags: Array.from(new Set([...tags,tagInputValue]))});
      this.setState({tagInputValue:''});
    }
  }

  selectCategory = category => {
    this.props.updatePostAndCb({category});
  }

  submitPublish = () => {
    const { tags, category } = this.props;
    if(!category){
      Toast.error('请选择文章分类！');
      return;
    }

    if(!tags.length){
      Toast.error('请至少添加一个标签！');
      return;
    }
    this.props.publishPost();
  }
  render() {
    const { tagInputValue, pubText } = this.state;
    const { tags, category, saving, published } = this.props;

    return (
      <PopupState variant="popover" popupId="publish-post-img-popup-popover">
        {(popupState) => (
          <div className='publish-post-content'>
            <Button className='publish-post-op-btn' color="primary" endIcon={popupState.isOpen ? <ArrowDropUp /> : <ArrowDropDown />} {...bindTrigger(popupState)}>{pubText}</Button>
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
                <div className='title'>{pubText}文章</div>
                <div className='category-wrap content-wraps'>
                  <header>分类</header>
                  <div className='category-btn-wrap'>
                    {
                      postCategorys.map(postCategory => (
                        <Button key={postCategory} variant='outlined' color={category === postCategory ? 'primary' : 'default'} size="small" onClick={this.selectCategory.bind(this,postCategory)}>
                        {postCategory}
                      </Button>
                      ))
                    }
                  </div>
                </div>
                <div className='tags-wrap content-wraps'>
                  <header>标签</header>
                  <Input 
                    ref={this.tagInput}
                    size='small'
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
                </div>
                <div className='post-submit-content'>
                <Button  disabled={saving} variant="contained" color="primary" disableElevation onClick={this.submitPublish}>
                  确定并{pubText}
                </Button>
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