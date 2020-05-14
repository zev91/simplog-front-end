import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
export const actions = {
  getPage: action({
    type: 'userSettingPage.getPage',
    action: () => ({
      tdk: {
        title: '用户设置',
        keywords: 'user-setting',
        description: 'simplog'
      }
    }),
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  uploadAvatar: action({
    type: 'userSettingPage.uploadAvatar',
    action: (params,http) => {
      return http.post('/api/upload/avatar',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  updateUserInfo: action({
    type: 'userSettingPage.uploadAvatar',
    action: (params,http) => {
      return http.put('/api/userinfo',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getInitialData: action({
    type: 'userSettingPage.getInitialData',
    action: async (http,dispatch) => {
      const page = await dispatch(actions.getPage());
      return ({
        page
      })
    },
    handler: (state, result) => {
      return {
        ...state,
        ...result
      }
    }
  },reducerHandler),
};

injectReducer({ key: 'userSettingPage', reducer: reducerHandler({page:{}})});


