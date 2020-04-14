import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();

export const actions = {
  
  getInitialData: action({
    type: 'registerPage.getPage',
    action: () => ({
      page:{
        tdk: {
          title: '注册',
          keywords: 'simplog',
          description: 'simplog 简约博客'
        }
      }
    }),
    handler: (state, result) => {
      return {
        ...state,
        ...result
      }
    }
  },reducerHandler),
};

injectReducer({ key: 'registerPage', reducer: reducerHandler({page:{}})});




