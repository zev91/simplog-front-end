import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { withRouter } from "react-router-dom";
import { Grid, Button, Divider, Link } from '@material-ui/core';
import withInitialData from 'src/componentHOC/with-initial-data';
import composeHOC from 'src/utils/composeHOC';
import createForm, { InputFormItem } from 'src/componentHOC/form-create';
import { actions } from './redux';
import { actions as getUserInfo } from 'src/componentLayout/redux';
import Toast from 'src/componentCommon/toast';
import css from './style.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: '获取验证码',
      seconds: 60, //称数初始化
      liked: true //获取验证码文案
    }
  }

  static state() {
    return ({
      page: {}
    })
  }

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  startCountDown = () => {
    this.setState({
      liked: false,
      seconds: this.state.seconds - 1,
    }, () => {
      if (this.state.seconds <= 0) {
        this.setState({
          liked: true,
          seconds: 60
        });
        clearInterval(this.siv);
        this.siv = null;
      }
    })
  }

  sendCode = () => {
    const { getFieldValues, validFields } = this.props;
    if (!validFields('email')) return;
    const email = getFieldValues('email');
    this.props.sendVerifyCode({ email }).then(res => {
      Toast.success(res.message);
      this.startCountDown();
      this.siv = setInterval(this.startCountDown, 1000);
    })
  }

  handleSubmit = () => {
    const { data, valid } = this.props.handleSubmit();
    if (!valid) return;
    this.props.fetchRegister(data).then(res => {
      if (res && res.success) {
        this.props.getUserInfo();
        this.props.history.push('/')
      }
    });
  }

  getVerifyCode = () => {
    this.sendCode();
  }

  render() {
    const { liked } = this.state;
    return (
      <div className='register-page-wrap'>
        <div className='form-wrap'>
          <img src='https://simplog.oss-cn-beijing.aliyuncs.com/system/logo.png' className='register-logo' />
          <div className='op-title'>
            <header>注册</header>
            <Divider />
          </div>

          <form className='form-content'>
            <InputFormItem required={true} fullWidth={true} name='username' label='用户名' {...this.props} />
            <InputFormItem required={true} fullWidth={true} name='password' type='password' label='密码' {...this.props} />
            <InputFormItem required={true} fullWidth={true} name='confirmPassword' type='password' label='确认密码' {...this.props} />
            <InputFormItem required={true} fullWidth={true} name='email' label='邮箱' rules='email' {...this.props} />
            <Grid container>
              <Grid item xs={9}>
                <InputFormItem required={true} fullWidth={true} name='verifycode' label='验证码' {...this.props} />
              </Grid>
              <Grid item xs={3} className='get-verify-code-wrap'>
                <Button color="primary" variant="outlined" disabled={!liked} onClick={this.getVerifyCode}>{liked ? this.state.btnText : this.state.seconds + ' s 后重发'}</Button>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" fullWidth={true} size="large" onClick={this.handleSubmit}>
              注册
            </Button>
            <div className='switch-op'>已有账户? <Link onClick={() => this.props.history.push('/login')}>去登录</Link></div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.registerPage,
});

export default composeHOC(
  createForm,
  withRouter,
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, { ...actions, getUserInfo: getUserInfo.getInitialData }, null)
)(Register); 