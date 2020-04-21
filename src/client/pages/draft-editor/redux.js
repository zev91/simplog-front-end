import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
export const actions = {
  getInitialData: action({
    type: 'editorDraftPage.getInitialData',
    action: async (path,http,dispatch) => {
      const urlInfo = path.split('/');
      const res = await dispatch(actions.getPost(urlInfo[urlInfo.length-1]));
      const page = await dispatch(actions.getPage());
      console.log({res,page})
      return ({
        post: res.data.post,
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

  getPost: action({
    type: 'editorDraftPage.getData',
    action: (id,http,dispatch,getstate) => {
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


