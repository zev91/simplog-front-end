import axios from 'axios';

export const ACTION_TYPE = {
  changeList: 'list/changelist'
}

//用于更新状态 action creater
const changeList = list => ({
  type: ACTION_TYPE.changeList,
  list
});

export const getInitialData = (props) => {
  return (dispatch, getState) => (
    axios.get('https://www.fastmock.site/mock/b6100fac0c7cd8fd548cee0fa0035255/crm/todo-list').then(res => {
      const data = {
        list:res.data.data,
        page: {
          tdk: {
            title: '列表页 - express-react-ssr',
            keywords: '关键词 express-react-ssr',
            description: '描述 express-react-ssr'
          }
        }
      }
      dispatch(changeList(data));
      return data;
    })
  )
};

const defaultState = {
  list: [],
  page: {}
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeList:
      return {//通过共享结构返回一个新对象
        ...state,
        ...action.list
      };
    default:
      return state;//返回默认
  }
}