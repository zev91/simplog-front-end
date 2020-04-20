// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
require ('@babel/polyfill');
import Cookie from 'js-cookie';
import * as enRedux from 'utils/redux';
const { createStore, asyncMiddleware, InjectReducerManager,locationReducer } = enRedux.default;
import { axiosCreater } from 'utils/http/axios';
import asyncHandler from 'utils/asyncHandler';

export const axios = axiosCreater({
  baseURL: __SERVER__ ? 'http://localhost:9999/' : '/',
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  activitySiteSuccessMiddleware : (response) => {
    if (response.staus === 200) {
      //to do
    }
    return response;
  },
  failMiddleware: (error) => {
    console.log(error.response)
    if (!error.response || (error.response && error.response.status === 401)) {
      // console.log(error)
      // location.href = '/login'
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
  config.headers['Authorization'] = __SERVER__ ? global.__SERVER_TOKEN__ : Cookie.get()['token'];
    return config;
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  return data
}, function (error) {
  return Promise.reject(error)
})

// const reducer = locationReducer

const middlewares = [asyncMiddleware({
  http: axios,     
  ...asyncHandler
})]

export default (initialState) => {
  const store = createStore(null, initialState, middlewares);
  InjectReducerManager.with(store);
  return store;
} 



