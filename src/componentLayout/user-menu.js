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
import Cookie from 'js-cookie';

export default ({userInfo,history}) => {
  const switchPage = (popupState,path) => {
    history.push(path);
    popupState.close();
  }

  const logout = (popupState) => {
    Cookie.set('token','');
    switchPage(popupState,'/login');
  }

  return (
    <PopupState variant="popover" popupId="user-menu-popup">
      {(popupState) => (
        <React.Fragment>
          <Avatar className='user-avater' {...bindTrigger(popupState)} src={userInfo.avatar} />
          <Menu
            {...bindMenu(popupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem onClick={switchPage.bind(null,popupState,'/user/'+userInfo._id)}><PersonIcon/>我的主页</MenuItem>
            <MenuItem onClick={switchPage.bind(null,popupState,'/editor/draft')}><DraftsIcon/>草稿</MenuItem>
            <MenuItem onClick={switchPage.bind(null,popupState,'/users/setting')}><SettingsIcon/>设置</MenuItem>
            <MenuItem onClick={logout.bind(null,popupState)}><ExitToAppIcon/>退出登录</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}