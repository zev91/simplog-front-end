import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import Editor from 'src/componentCommon/editor';
import css from './style.scss';

//组件
class EditorPost extends React.Component {
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

  render() {

    return (
      <Editor
        {...this.props}
        published={true}
      />
    )
  }
}

const mapStateToProps = state => ({
  initialData: state.editPostPage,
  userInfo: state.userInfo
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(EditorPost); 