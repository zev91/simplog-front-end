import * as enRedux from 'utils/redux';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
// console.log(reducerHandler)
export const actions = {
  getUserInfo: action({
    type: 'userInfo.getUserInfo',
    action: (http) => {
      return http.post('https://www.fastmock.site/mock/b6100fac0c7cd8fd548cee0fa0035255/crm/userInfo')
    },
    handler: (state, result) => {
      return {
        ...state
      }
    }
  },reducerHandler),

  getInitialData: action({
    type: 'userInfo.getInitialData',
    action: async (http,dispatch) => {

      const res = await dispatch(actions.getUserInfo());
      return ({
        ...res.data
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

injectReducer({ key: 'userInfo', reducer: reducerHandler({})});


