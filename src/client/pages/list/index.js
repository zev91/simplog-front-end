import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './redux';
import withInitialData from 'src/componentHOC/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeHOC from 'src/utils/composeHOC';
import css from './style.scss';

//组件
class List extends React.Component {
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
      <div>
        <button onClick={this.handlerClick}> 加载</button>
        {!list.length ?
          '暂无数据'
          :
          <ul className='user-list'>{list.map(((item, idx) => {
            return (
              <li key={idx}>
                user: {item.user}
                city: {item.city}
                groupName: {item.groupName}
                intention: {item.intention}
                date: {item.date}
              </li>
            )
          }))}</ul>
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  initialData: state.listPage,
});

//将获取数据的方法也做为 props传递给组件
const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
)

export default composeHOC(
  withStyles(css),
  withInitialData,
  connect(mapStateToProps, mapDispatchToProps, null)
)(List); 