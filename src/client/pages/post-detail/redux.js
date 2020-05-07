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
      const resLikers = await dispatch(actions.getPostLikers(postId));
      const resCollectioned = await dispatch(actions.getCollectioned(postId));
      const resFollowedauthor = await dispatch(actions.hasFollowedAuthor(postId));
      const page = {
        tdk: {
          title: '',
          keywords: '',
          description: ''
        }
      }

      const post = resPost.data.post;
      const comments = resComment.data.comments;
      const likers = resLikers.data.likers;
      const hasCollectioned = resCollectioned.data.hasCollectioned;
      const hasFollowedAuthor = resFollowedauthor.data.hasFollowed;

      page.tdk.title = post.title;
      page.tdk.keywords = post.tags .join(',');
      page.tdk.description = post.title;

      return ({
        post,
        comments,
        likers,
        hasCollectioned,
        hasFollowedAuthor,
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

  likePost: action({
    type: 'postDetailPage.likePost',
    action: (postId,http) => {
      return http.post(`/api/likePost/${postId}`)
    },
    handler: (state, result) => {

      return {
        ...state,
      }
    }
  },reducerHandler),

  getPostLikers: action({
    type: 'postDetailPage.getPostLikers',
    action: (postId,http) => {
      return http.get(`/api/getPostLikers/${postId}`)
    },
    handler: (state, result) => {
      return {
        ...state,
        ...result.data
      }
    }
  },reducerHandler),

  collectionPost: action({
    type: 'postDetailPage.collectionPost',
    action: (postId,http) => {
      return http.post(`/api/collectionPost/${postId}`)
    },
    handler: (state, result) => {
      return {
        ...state,
      }
    }
  },reducerHandler),

  getCollectioned: action({
    type: 'postDetailPage.getCollectioned',
    action: (postId,http) => {
      return http.get(`/api/hasCollectioned/${postId}`)
    },
    handler: (state, result) => {
      return {
        ...state,
        ...result.data
      }
    }
  },reducerHandler),

  followauthor: action({
    type: 'postDetailPage.followauthor',
    action: (userId,http) => {
      return http.post(`/api/follow/${userId}`)
    },
    handler: (state, result) => {
      return {
        ...state,
      }
    }
  },reducerHandler),

  hasFollowedAuthor: action({
    type: 'postDetailPage.hasFollowedAuthor',
    action: (postId,http) => {
      return http.get(`/api/hasFollowedAuthor/${postId}`)
    },
    handler: (state, result) => {
      return {
        ...state,
        ...result.data
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
  likers: [],
  hasCollectioned:false,
  hasFollowed: false,
  comments:[],
  page:{}
}
injectReducer({ key: 'postDetailPage', reducer: reducerHandler(inintState)});





