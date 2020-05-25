import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';
const { action, createReducer, injectReducer } = enRedux.default;
import Cookie from 'js-cookie';
const reducerHandler = createReducer();

export const actions = {
  
  getInitialData: action({
    type: 'registerPage.getPage',
    action: () => ({
      page:{
        tdk: {
          title: '注册',
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

  sendVerifyCode: action({
    type: 'registerPage.sendVerifyCode',
    action: (params,http) => {
      return http.post('/api/email',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  fetchRegister: action({
    type: 'registerPage.fetchRegister',
    action: (params,http) => {
      return http.post('/api/user/register',params)
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
  key: 'registerPage',
  state: {page:{}}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});





