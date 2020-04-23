import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
export const actions = {
  getInitialData: action({
    type: 'editPostPage.getInitialData',
    action: async (http,dispatch) => {
      const path = __SERVER__ ? global.REQUEST_PATH : location.pathname;
      const urlInfo = path.split('/');
      const postId = urlInfo[urlInfo.length-1];

      const res = await dispatch(actions.getPost(postId));
      const page = {
        tdk: {
          title: '',
          keywords: '',
          description: ''
        }
      }

      const post = res.data.post;

      page.tdk.title = '写文章-'+ (post.title || '');
      page.tdk.keywords = post.tags ? post.tags .join(',') : '';
      page.tdk.description = post.title || '';

      return ({
        post,
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
    type: 'editPostPage.getPost',
    action: (id,http) => {
      return http.get(`/api/getEditPost/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  updatePost: action({
    type: 'editPostPage.updatePost',
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
    type: 'editPostPage.publishPost',
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
    type: 'editPostPage.uploadImage',
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
    type: 'editPostPage.uploadHeaderImage',
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

injectReducer({ key: 'editPostPage', reducer: reducerHandler({post:{},page:{}})});





