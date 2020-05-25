import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import { actions as layoutAction } from 'src/componentLayout/redux';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Toast from 'src/componentCommon/toast';
import css from './style.scss';

const ChangeItem = ({label,placeholder,name,userInfo, updateUserInfo}) => {
  const [status, setStatus] = useState('blur');
  const [value, setValue] = useState(userInfo[name]);
  const inputRef = React.createRef();
  const handlerEdit = () => {
    setStatus('focus');
    inputRef.current.focus();
  }
  const handlerBlur = () => {
    setStatus('blur');
    inputRef.current.bliur();
  }
  const handlerSaveForm = (e) => {
    e.stopPropagation();
    updateUserInfo({[name]:value})
  }

  return (
    <div className='other-info'>
      <label className='item-label'>{label}</label>
      <input 
        className='change-input' 
        placeholder={placeholder} 
        ref={ inputRef } 
        value={value} 
        onChange={e => setValue(e.target.value)}
        onFocus={() => setStatus('focus')}
        onBlur={() => setStatus('blur')}
        />
      <div className='op-bars'>
        {
          status === 'blur' 
            ?
            <IconButton aria-label='edit' color='primary' onClick={ handlerEdit }>
              <EditIcon fontSize='small' />
            </IconButton>
            :
            [ <Link onMouseDown={handlerSaveForm}>保存</Link>,
              <Link color='inherit' onClick={ handlerBlur }>取消</Link>
            ]
        }
        
      </div>
    </div>
  )
}

//组件
class UserSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static state() {
    return (
      {
        postData: {
          datas: [],
          page: {}
        },
        page: {}
      }
    )
  }

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  handerUploadHeaderImage = async (e) => {
    try{
      const { avatar } = this.props.userInfo;
      const formData = new FormData();
      const image = e.target.files[0];
      this.setState({uploading: true});
      formData.append('images', image);
      const res = await this.props.uploadAvatar(formData);
      if (res && res.success) {
        this.updateUserInfo({avatar: res.data.url})
      }
    }finally{
      this.setState({uploading: false});
    }
  }

  updateUserInfo = async params => {
    const updateUserRes =  await this.props.updateUserInfo(params);
    if(updateUserRes.success){
      Toast.success(updateUserRes.data.message);
      this.props.getUserInfo();
    }else{
      Toast.error(updateUserRes.data.message);
    }
  }

  render() {
    const { avatar } = this.props.userInfo;
    const { uploading } =this.state;
    return (
      <div className='user-setting-page'>
        <Backdrop className='async-loading' open={uploading} >
          <CircularProgress color="primary" />
          <span className='loading-tips'>头像上传中...</span>
        </Backdrop>
        <div className='setting-block block shadow'>
          <header>用户设置</header>
          <div className='upload-avatar'>
            <label className='item-label'>头像</label>
            <div className='avater-content'>
              <img src={avatar+'?x-oss-process=style/user-center-avatar'}/>
              <div className='upload-block'>
                <span className='upload-tips'>支持 jpg、png 格式大小 5M 以内的图片</span>
                <div className='upload-item'>
                  <input
                    accept='image/*'
                    id='contained-button-file'
                    multiple
                    type='file'
                    onChange = {this.handerUploadHeaderImage}
                  />
                  <label htmlFor='contained-button-file'>
                    <Button size='small' variant='contained' color='primary' disableElevation component='span'>
                      点击上传
                  </Button>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <ChangeItem 
            label='用户名' 
            placeholder='填写你的用户名' 
            name='username' 
            userInfo={this.props.userInfo}
            updateUserInfo={this.updateUserInfo}
          />
          <ChangeItem
            label='职位' 
            placeholder='填写你的职位' 
            name='jobTitle' 
            userInfo={this.props.userInfo}
            updateUserInfo={this.updateUserInfo}
          />
          <ChangeItem 
            label='公司' 
            placeholder='填写所在的公司' 
            name='company' 
            userInfo={this.props.userInfo}
            updateUserInfo={this.updateUserInfo}
          />
          <ChangeItem 
            label='个人介绍' 
            placeholder='填写职业技能、擅长或喜欢的事情'
            name='selfDescription' 
            userInfo={this.props.userInfo}
            updateUserInfo={this.updateUserInfo}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.userSettingPage,
  userInfo: state.userInfo
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions, getUserInfo: layoutAction.getInitialData }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(UserSetting); 