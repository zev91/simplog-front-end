import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { withRouter } from "react-router-dom";
import { Grid,  Button, Divider,Link } from '@material-ui/core';
import withInitialData from 'src/componentHOC/with-initial-data';
import composeHOC from 'src/utils/composeHOC';
import createForm, { InputFormItem } from 'src/componentHOC/form-create';
import logo from 'src/assets/logo.png';
import { actions } from './redux';
import css from './style.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static state() {
    return ({
      page: {}
    })
  }
  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }


  handleSubmit = () => {
    const { data, valid } = this.props.handleSubmit();
    if(!valid) return;
    this.props.fetchLogin(data).then(res => {
      if(res && res.success){
        this.props.history.push('/')
      }
    });
  }

  render() {
    return (
      <div className='register-page-wrap'>
        <div className='form-wrap'>
          <img src={logo} className='register-logo' />
          <div className='op-title'>
            <header>登录</header>
            <Divider />
          </div>
          <form className='form-content'>
            <InputFormItem required={true} fullWidth={true} name='username' label='用户名' {...this.props} />
            <InputFormItem required={true} fullWidth={true} name='password' type='password' label='密码' {...this.props} />

            <Button variant="contained" color="primary" fullWidth={true} size="large" onClick={this.handleSubmit}>
               登录
            </Button>

            <div className='switch-op'>还没账户? <Link onClick={() =>this.props.history.push('/register')}>去注册</Link></div>
          </form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.loginPage,
});

export default composeHOC(
  createForm,
  withRouter,
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, actions, null)
)(Login); 