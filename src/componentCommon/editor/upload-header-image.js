import React, { Component, createRef } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { IconButton, Button, Box, Popover, ButtonBase } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import css from './upload-header-image.scss';

class UploadHeaderImage extends Component {

  constructor(props){
    super(props);
  }
  handerUploadHeaderImage = async (e) => {
    const formData = new FormData();
    const image = e.target.files[0];
    formData.append('images', image);
    // Toast.loading('上传中');
    const res = await this.props.uploadHeaderImage(formData);
    if (res && res.success) {
      this.props.updatePostAndCb({headerBg: res.data.url});
    }
  }

  handlerDeleteHeaderImage = () => {
    this.props.updatePostAndCb({headerBg:''});
  }
  render() {
    const { headerBg } =this.props;
    return (
      <PopupState variant="popover" popupId="upload-header-img-popup-popover">
        {(popupState) => (
          <div>
            <IconButton color={headerBg ? 'primary': ''} {...bindTrigger(popupState)}>
              <ImageIcon />
            </IconButton>
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
              <div className='upload-content'>
                <div className='title'>添加封面大图</div>
                {
                    headerBg
                    ?
                    <div className='image-content'>
                      <IconButton aria-label="delete" onClick={this.handlerDeleteHeaderImage} className='delete-header-image' size="small">
                        <DeleteIcon />
                      </IconButton>
                      <img src={headerBg+'?x-oss-process=style/header-image-review'}/>
                    </div>
                    
                    :
                    <div>
                    <input
                      accept="image/*"
                      id="upload-header-image"
                      type="file"
                      onChange = {this.handerUploadHeaderImage}
                    />
                    <label htmlFor="upload-header-image">
                      <ButtonBase
                        component="span"
                        key={'upload'}
                        className='upload-header-btn'
                      >
                        点击此处添加图片
                      </ButtonBase> 
                    </label>
                    </div>
                    
                  }
                
                
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    )
  }
}

export default  withStyles(css)(UploadHeaderImage)