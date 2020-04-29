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

      const resPost = await dispatch(actions.getPost(postId));
      const resComment = await dispatch(actions.getComment(postId));
      const page = {
        tdk: {
          title: '',
          keywords: '',
          description: ''
        }
      }

      const post = resPost.data.post;
      const comments = resComment.data.comments;

      page.tdk.title = post.title;
      page.tdk.keywords = post.tags .join(',');
      page.tdk.description = post.title;

      return ({
        post,
        comments,
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
    type: 'postDetailPage.getPost',
    action: (id,http) => {
      return http.get(`/api/posts/${id}`)
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getComment: action({
    type: 'postDetailPage.getComments',
    action: (id,http) => {
      return http.get(`/api/posts/${id}/comment`)
    },
    handler: (state, result) => {
      const comments = result.data.comments;
      return {
        ...state,
        comments
      }
    }
  },reducerHandler),

  createComment: action({
    type: 'postDetailPage.createComment',
    action: (params,http) => {
      let id = params.id;
      delete params.id;
      return http.post(`/api/posts/${id}/comment`,params)
    },
    handler: (state, result) => {

      return {
        ...state,
      }
    }
  },reducerHandler),

  deleteComment: action({
    type: 'postDetailPage.deleteComment',
    action: (commentId,http) => {
      return http.post(`/api/deleteComment/${commentId}`)
    },
    handler: (state, result) => {

      return {
        ...state,
      }
    }
  },reducerHandler),

};

const inintState = {
  post: {
    body:'',
    headerBg:'',
    tags:[]
  },
  comments:[],
  page:{}
}
injectReducer({ key: 'postDetailPage', reducer: reducerHandler(inintState)});





