import axios from 'axios';

export const ACTION_TYPE = {
  changeTKD: 'home/changeTKD'
}

//用于更新状态 action creater
const changeTKD = page => ({
  type: ACTION_TYPE.changeTKD,
  page
});

export const getInitialData = (props) => {
  return (dispatch, getState) => {
    const data = {
      page:{
        tdk: {
          title: '首页',
          keywords: '前端技术首页',
          description: '前端技术首页'
        }
      }
    }
    dispatch(changeTKD(data));
    return data;
  }
};

const defaultState = {
  page: {}
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPE.changeTKD:
      return {//通过共享结构返回一个新对象
        ...state,
        ...action.page
      };
    default:
      return state;//返回默认
  }
}