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

export default ({userInfo,history}) => {
  const switchPage = (popupState,path) => {
    history.push(path);
    popupState.close();
  }
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
            <MenuItem onClick={switchPage.bind(null,popupState,'/user/5e96d4c268240036fe98505f/menu')}><PersonIcon/>我的主页</MenuItem>
            <MenuItem onClick={switchPage}><BookmarkIcon/>收藏的文章</MenuItem>
            <MenuItem onClick={switchPage}><DraftsIcon/>草稿</MenuItem>
            <MenuItem onClick={switchPage}><SettingsIcon/>设置</MenuItem>
            <MenuItem onClick={switchPage}><ExitToAppIcon/>退出</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}