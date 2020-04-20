import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
// console.log(reducerHandler)
export const actions = {
  getInitialData: action({
    type: 'userInfo.getInitialData',
    action: (http) => {
      return http.get('/api/userinfo')

    },
    handler: (state, result) => {
      return {
        ...state,
        ...result.data.user
      }
    }
  },reducerHandler),
};

injectReducer({ key: 'userInfo', reducer: reducerHandler({})});


