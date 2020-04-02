import React from 'react';
import axios from 'axios';
import withInitialData from 'src/components/with-initial-data';
import withStyles from 'isomorphic-style-loader/withStyles'
const css = require('./style.scss');

//组件
class List extends React.Component {
  constructor(props) {
    super(props);
    console.log(css)
  }

  static state () {
    return (  
      { list: [], page: {} } 
    )
  }


  static async getInitialProps() {
    const res = await axios.get('https://www.fastmock.site/mock/b6100fac0c7cd8fd548cee0fa0035255/crm/todo-list');
    return ({
      list: res.data.data,
      page: {
        tdk: {
          title: '列表页',
          keywords: '前端技术江湖',
          description: '前端技术江湖'
        }
      }
    });
  }

  render() {
    const { list } = this.props.initialData;
  
    return (
      <div>
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


export default withStyles(css)(withInitialData(List)); 