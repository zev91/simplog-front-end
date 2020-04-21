import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();

export const actions = {
  
  getInitialData: action({
    type: 'notFoundPage.getPage',
    action: () => ({
      page:{
        tdk: {
          title: '404 Not Found',
          keywords: '404 Not Found',
          description: '404 Not Found'
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

injectReducer({ key: 'notFoundPage', reducer: reducerHandler({page:{}})});




