import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';

const { action, createReducer, injectReducer } = enRedux.default;
const reducerHandler = createReducer();

export const actions = {
  getInitialData: action({
    type: 'userCenterPage.getInitialData',
    action: async (http, dispatch) => {

      const path = __SERVER__ ? global.REQUEST_PATH : location.pathname;
      const urlInfo = path.split('/');
      const userId = urlInfo[urlInfo.length - 1];
      const page = {
        tdk: {
          title: '',
          keywords: '',
          description: ''
        }
      }

      const resUserInfo = await dispatch(actions.getOtherUserInfo(userId));
      page.tdk.title = resUserInfo.data.user.username + '的主页';
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
  }, reducerHandler),

  getPage: action({
    type: 'userCenterPage.getPage',
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
  }, reducerHandler),

  followauthor: action({
    type: 'userCenterPage.followauthor',
    action: (userId, http) => {
      return http.post(`/api/follow/${userId}`)
    },
    handler: (state, result) => {
      return {
        ...state,
      }
    }
  }, reducerHandler),

  getOtherUserInfo: action({
    type: 'userCenterPage.getOtherUserInfo',
    action: (id, http) => {
      return http.get(`/api/getOtherUserInfo/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state,
        userInfo: result.data.user
      }
    }
  }, reducerHandler),

  getUserPosts: action({
    type: 'userCenterPage.getUserPosts',
    action: (params, http) => {
      const { id, pageNo } = params;
      return http.get(`/api/userPosts/${id}?pageNo=${pageNo}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  }, reducerHandler),

  getActivites: action({
    type: 'userCenterPage.getActivites',
    action: (params, http) => {
      const { id, pageNo } = params;
      return http.get(`/api/getActivites/${id}?pageNo=${pageNo}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  }, reducerHandler),

  deletePost: action({
    type: 'userCenterPage.deletePost',
    action: (id, http) => {
      return http.delete(`/api/posts/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  }, reducerHandler),

  getFollowedUsers: action({
    type: 'userCenterPage.getFollowedUsers',
    action: (params, http) => {
      if (!params.followType) {
        params['followType'] = 'FOLLOW_TO'
      }
      const { id, pageNo, followType } = params;

      return http.get(`/api/getFollowedUsers/${id}?pageNo=${pageNo}&followType=${followType}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  }, reducerHandler),

  getUserCollections: action({
    type: 'userCenterPage.getActivites',
    action: (params, http) => {
      const { id, pageNo } = params;
      return http.get(`/api/getUserCollections/${id}?pageNo=${pageNo}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  }, reducerHandler),
};

let initState = {
  key: 'userCenterPage',
  state: { userInfo: {}, page: {} }
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState)) });
