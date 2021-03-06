import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';
import Cookie from 'js-cookie';

const { action, createReducer, injectReducer } = enRedux.default;
const reducerHandler = createReducer();

export const actions = {
  getInitialData: action({
    type: 'loginPage.getPage',
    action: () => ({
      page:{
        tdk: {
          title: '登录',
          keywords: 'simplog',
          description: 'simplog 简约博客'
        }
      }
    }),
    handler: (state, result) => {
      return {
        ...state,
        ...result
      }
    }
  },reducerHandler),

  fetchLogin: action({
    type: 'loginPage.fetchLogin',
    action: (params,http) => {
      return http.post('/api/user/login',params)
    },
    handler: (state, result) => {
      const { success } = result;
      if(success) {
        Cookie.set('token',result.data.token);
      }
      return {
        ...state
      }
    }
  },reducerHandler),
};

let initState = {
  key: 'loginPage',
  state: {page:{}}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});





