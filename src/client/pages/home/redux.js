import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
export const actions = {

  getPosts: action({
    type: 'listPage.getPosts',
    action: (http,dispatch,getstate) => {
      return http.get('/api/posts')
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getMorePosts: action({
    type: 'listPage.getMorePosts',
    action: (params,http,dispatch,getstate) => {
      return http.get('/api/posts?pageNo='+params.pageNO)
    },
    handler: (state, result) => {
      const newPostData = JSON.parse(JSON.stringify(state.postData));
      newPostData.datas = [...newPostData.datas, ...result.data.datas];
      newPostData.page = result.data.page;
      return {
        ...state,
        postData:newPostData
      }
    }
  },reducerHandler),

  getPage: action({
    type: 'listPage.getPage',
    action: () => ({
      tdk: {
        title: '首页',
        keywords: 'simple blog',
        description: '极简博客平台'
      }
    }),
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getInitialData: action({
    type: 'listPage.getInitialData',
    action: async (http,dispatch) => {
      const res = await dispatch(actions.getPosts());
      const page = await dispatch(actions.getPage());
      return ({
        postData: res.data,
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

  initCompoentReduxFromServer: action({
    type: 'listPage.initCompoentReduxFromServer',
    action: async (params) => {
      console.log(params);

      return 
    },
    handler: (state, result) => {
      return {
        ...state,
        // ...result
      }
    }
  },reducerHandler),
};

let initState = {
  key: 'listPage',
  state: {postData:{datas:[],page:{}},page:{}}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});


