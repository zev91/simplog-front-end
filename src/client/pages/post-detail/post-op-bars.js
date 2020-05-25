import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default ({handlerCollection, hasCollectioned}) => {
  
  return (
    <PopupState variant="popover" popupId="post-op-popup-menu">
    {(popupState) => (
      <React.Fragment>
        <IconButton variant="outlined" aria-label="more" {...bindTrigger(popupState)}>
          <MoreVertIcon />
        </IconButton>
        <Menu 
          {...bindMenu(popupState)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
          <MenuItem onClick={handlerCollection.bind(null,popupState)}>{hasCollectioned ? <span className='collection-show'><CheckIcon size='small'/>已收藏</span> : <span>收藏文章</span>}</MenuItem>
          {/* <MenuItem onClick={popupState.close}>Death</MenuItem> */}
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
  )
} 