import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';

const { action, createReducer, injectReducer } = enRedux.default;
const reducerHandler = createReducer();

export const actions = {
  getInitialData: action({
    type: 'editorDraftPage.getInitialData',
    action: async (http,dispatch) => {
      const path = __SERVER__ ? global.REQUEST_PATH : location.pathname;
      const urlInfo = path.split('/');
      const postId = urlInfo[urlInfo.length-1];

      const res = postId === 'new' ? {data:{post:{}}} : await dispatch(actions.getPost(postId));
      const page = {
        tdk: {
          title: '',
          keywords: '',
          description: ''
        }
      }

      const post = res.data.post;

      page.tdk.title = '草稿-'+ (post.title || '');

      return ({
        post,
        page
      })
    },
    handler: (state, result) => {
      console.log({result})
      return {
        ...state,
        ...result
      }
    }
  },reducerHandler),

  getPost: action({
    type: 'editorDraftPage.getPost',
    action: (id,http) => {
      return http.get(`/api/getEditPost/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  createPost: action({
    type: 'editorDraftPage.createPost',
    action: (params,http) => {
      return http.post('/api/createPost',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  updatePost: action({
    type: 'editorDraftPage.updatePost',
    action: (params,http) => {
      const { id } = params;
      delete params.id;
      return http.put(`/api/posts/${id}`,params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  publishPost: action({
    type: 'editorDraftPage.publishPost',
    action: (params,http) => {
      const { id } = params;
      delete params.id;
      return http.post(`/api/publishPost/${id}`,params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  uploadImage: action({
    type: 'editorDraftPage.uploadImage',
    action: (params,http) => {
      return http.post('/api/upload/post',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  uploadHeaderImage: action({
    type: 'editorDraftPage.uploadHeaderImage',
    action: (params,http) => {
      return http.post('/api/upload/header',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),
};

let initState = {
  key: 'editorDraftPage',
  state: {post:{},page:{}}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});


