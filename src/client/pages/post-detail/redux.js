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

      const data = res.data;

      page.tdk.title = data.post.title;
      page.tdk.keywords = data.post.tags .join(',');
      page.tdk.description = data.post.title;

      return ({
        data,
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

};

const inintState = {
  data:{
    post: {
      body:'',
      headerBg:'',
      tags:[]
    }
  },
  page:{}
}
injectReducer({ key: 'postDetailPage', reducer: reducerHandler(inintState)});





