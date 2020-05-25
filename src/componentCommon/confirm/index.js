import React, { Component } from 'react';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Button, Popover } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import css from './style.scss';

class CustConfirm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, click, header, successCb } = this.props;
    return (
      <PopupState variant="popover" popupId="confirm-popup-popover">
        {(popupState) => {
          const handlerClick = async () => {
            const res = await click();
            if (res) {
              popupState.close();
              successCb && successCb();
            }
          }
          return (
            <div>
              <span {...bindTrigger(popupState)}>
                {children}
              </span>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className='confirm-delete-wrap'>
                  <div className='confirm-header'>
                    <ErrorIcon color='error' fontSize='small' /> {header}
                  </div>
                  <div className='delete-op-wrap'>
                    <Button size="small" onClick={popupState.close}>取消</Button>
                    <Button size="small" variant="outlined" color="primary" onClick={handlerClick}>确定</Button>
                  </div>
                </div>
              </Popover>
            </div>
          )
        }}
      </PopupState>
    )
  }
}

export default withStyles(css)(CustConfirm);