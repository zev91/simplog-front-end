import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';

import { TextField, Grid, FormControl, Input, InputLabel, InputAdornment, Button,FormHelperText } from '@material-ui/core';

import withInitialData from 'src/componentHOC/with-initial-data';
import composeHOC from 'src/utils/composeHOC';
import createForm, { InputFormItem } from 'src/componentHOC/form-create';
import logo from 'src/assets/logo.png'
import { actions } from './redux';
import css from './style.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  static state() {
    return (
      { page: {} }
    )
  }
  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  handleSubmit = () => {
    const { data, valid} = this.props.handleSubmit();

    console.log({ data, valid} )
  }

  handlerClick() {
    console.log('点击事件测试=======>>>> click');
  }

  render() {
    return (
      <div className='register-page-wrap'>
   
        <div className='form-wrap'>
          <img src={logo} className='register-logo'/>
          <form className='form-content'>
            <InputFormItem required={true} fullWidth={true} name='username' label='用户名' {...this.props}/>
            <InputFormItem required={true} fullWidth={true} name='password' type='password' label='密码' {...this.props}/>
            <InputFormItem required={true} fullWidth={true} name='confirmpassword' type='password'  label='确认密码' {...this.props}/>
            <InputFormItem required={true} fullWidth={true} name='email' label='Email' rules='email' {...this.props}/>
            <Button variant="contained" color="primary" fullWidth={true} size="large" onClick={this.handleSubmit}>
              提交
            </Button>
          </form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.registerPage,
});

//将获取数据的方法也做为 props传递给组件

export default composeHOC(
  createForm,
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, actions, null)
)(Register); 