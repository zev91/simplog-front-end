import * as enRedux from 'utils/redux';
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

  getPage: action({
    type: 'listPage.getPage',
    action: () => ({
      tdk: {
        title: '列表页',
        keywords: '前端技术江湖',
        description: '前端技术江湖'
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
};

injectReducer({ key: 'listPage', reducer: reducerHandler({postData:{datas:[],page:{}},page:{}})});


