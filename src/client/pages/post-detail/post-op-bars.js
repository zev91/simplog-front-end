import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default () => {


  
  return (
    <PopupState variant="popover" popupId="post-op-popup-menu">
    {(popupState) => (
      <React.Fragment>
        <IconButton aria-label="more" {...bindTrigger(popupState)}>
          <MoreVertIcon />
        </IconButton>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
  )
} 