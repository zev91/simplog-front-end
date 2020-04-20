import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import { Button } from '@material-ui/core';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import Editor from 'src/componentCommon/editor';
import css from './style.scss';


//组件
class EditPost extends React.Component {
  constructor(props) {
    super(props);
  }

  static state() {
    return (
      { list: [], page: {} }
    )
  }

  static async getInitialProps({ store }) {
    return store.dispatch(actions.getInitialData());
  }

  handlerClick = () => {
    console.log(this.props)
  }

  render() {
    const { list } = this.props.initialData;
    return (
     <Editor/>
    // <div>demo</div>
    )
  }
}


const mapStateToProps = state => ({
  initialData: state.editPostPage,
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

EditPost.__OPEN_SSR__=false;

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(EditPost); 