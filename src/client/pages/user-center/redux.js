import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
export const actions = {

  getInitialData: action({
    type: 'listPage.getInitialData',
    action: async (http,dispatch) => {

      const path = __SERVER__ ? global.REQUEST_PATH : location.pathname;
      const urlInfo = path.split('/');
      const userId = urlInfo[urlInfo.length-2];
      const page = {
        tdk: {
          title: '',
          keywords: '',
          description: ''
        }
      }

      const resUserInfo = await dispatch(actions.getOtherUserInfo(userId));
      page.tdk.title = resUserInfo.data.user.username+'的主页';
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

  getPage: action({
    type: 'listPage.getPage',
    action: () => ({
      tdk: {
        title: '个人主页',
        keywords: 'simple blog',
        description: '个人主页'
      }
    }),
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getOtherUserInfo: action({
    type: 'postDetailPage.getOtherUserInfo',
    action: (id,http) => {
      return http.get(`/api/getOtherUserInfo/${id}`)
    },
    handler: (state, result) => {
      
      return {
        ...state,
        userInfo:result.data.user
      }
    }
  },reducerHandler),

  getUserPosts: action({
    type: 'postDetailPage.getUserPosts',
    action: (params,http) => {
      const { id, pageNo } = params;
      return http.get(`/api/userPosts/${id}?pageNo=${pageNo}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getActivites: action({
    type: 'postDetailPage.getActivites',
    action: (params,http) => {
      const { id, pageNo } = params;
      return http.get(`/api/getActivites/${id}?pageNo=${pageNo}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  deletePost: action({
    type: 'postDetailPage.deletePost',
    action: (id,http) => {
      return http.delete(`/api/posts/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),
};

injectReducer({ key: 'userCenterPage', reducer: reducerHandler({userInfo:{},page:{}})});

