import * as enRedux from 'utils/redux';
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
      const page = await dispatch(actions.getPage());

      return ({
        post: res.data.post,
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

  getPage: action({
    type: 'editorDraftPage.getPage',
    action: () => ({
      tdk: {
        title: '草稿',
        keywords: '前端技术江湖 草稿',
        description: '前端技术江湖'
      }
    }),
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

  uploadImage: action({
    type: 'editorDraftPage.uploadImage',
    action: (params,http) => {
      return http.post('/api/upload',params)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),
};

injectReducer({ key: 'editorDraftPage', reducer: reducerHandler({post:{},page:{}})});


