import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DraftsIcon from '@material-ui/icons/Drafts';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default ({userInfo}) => {
  return (
    <PopupState variant="popover" popupId="user-menu-popup">
      {(popupState) => (
        <React.Fragment>
          <Avatar className='user-avater' {...bindTrigger(popupState)}>{userInfo.username[0]}</Avatar>
          <Menu
            {...bindMenu(popupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem onClick={popupState.close}><PersonIcon/>我的主页</MenuItem>
            <MenuItem onClick={popupState.close}><BookmarkIcon/>收藏的文章</MenuItem>
            <MenuItem onClick={popupState.close}><DraftsIcon/>草稿</MenuItem>
            <MenuItem onClick={popupState.close}><SettingsIcon/>设置</MenuItem>
            <MenuItem onClick={popupState.close}><ExitToAppIcon/>退出</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}