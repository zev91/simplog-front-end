import React from 'react';
import axios from 'axios';
import { setInitData } from 'src/utils/helper';
import Tdk from 'src/components/tdk';

//组件
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = setInitData({ list: [], page: {} }, props)
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

  componentDidMount() {
    console.log(this.state)
    if (!this.state.list.length) {//判断是否有初始化数据
      //进行数据请求
      List.getInitialProps().then(({ list, page }) => {
        this.setState({
          list: list || [],
          page
        });
      })
    }
  }

  render() {
    const { list, page } = this.state;
    return (
      <div>
        <Tdk {...page.tdk} />
        {!list.length ?
          '暂无数据'
          :
          <ul>{this.state.list.map(((item, idx) => {
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