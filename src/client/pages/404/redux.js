import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';
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

let initState = {
  key: 'notFoundPage',
  state: {page:{}}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});





