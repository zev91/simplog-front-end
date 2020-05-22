import * as enRedux from 'utils/redux';
import { getInitState } from 'utils/helper';
const { action, createReducer, injectReducer } = enRedux.default;

const reducerHandler = createReducer();
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

let initState = {
  key: 'userInfo',
  state: {}
};

injectReducer({ key: initState.key, reducer: reducerHandler(getInitState(initState))});



