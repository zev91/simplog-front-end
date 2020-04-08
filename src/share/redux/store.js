// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
require ('@babel/polyfill');
import * as enRedux from 'utils/redux';
const { createStore, asyncMiddleware, InjectReducerManager } = enRedux.default;
import { axiosCreater } from 'utils/http/axios';
import asyncHandler from 'utils/asyncHandler';

export const axios = axiosCreater({
  baseURL: '/',
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  failMiddleware: (error) => {
    if (!error.response || (error.response && error.response.status === 403)) {
      // location.href = __BASENAME__ + 'login'
      throw new Error('没有登录')
    } else {
      throw error
    }
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(function (config) {
  // if (config.url.charAt(0) !== '/') {
  //   config.url = '/' + config.url
  // }
  return config
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  return data
}, function (error) {
  return Promise.reject(error)
})

const reducer = {
  // userInfo: userInfoReducer
}

const middlewares = [asyncMiddleware({
  http: axios,     
  ...asyncHandler
})]

export default (initialState) => {
  const store = createStore(reducer, initialState, middlewares);
  InjectReducerManager.with(store);
  return store;
} 


// import { createStore as }
// import reducer from './reducer';

// let composeEnhancers = compose;

// if (!__SERVER__) {
//   const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__     
//   if (typeof composeWithDevToolsExtension === 'function') {
//     composeEnhancers = composeWithDevToolsExtension;
//   }
// }

// export default (defaultState = {}) => {
//   const store = createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)));
// }


