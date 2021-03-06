// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
require('@babel/polyfill');
import Cookie from 'js-cookie';
import * as enRedux from 'utils/redux';
const { createStore, asyncMiddleware, InjectReducerManager, locationReducer } = enRedux.default;
import { axiosCreater } from 'utils/http/axios';
import asyncHandler from 'utils/asyncHandler';

export const axios = axiosCreater({
  baseURL: __SERVER__ ? 'http://localhost:9999/' : '/',
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  activitySiteSuccessMiddleware: (response) => {
  
    if (response.staus === 200) {
      //to do
    }
    return response;
  },
  failMiddleware: (error) => {
    // console.log('error.response====>>>',error.response.status);
  // console.log('没有登录====>>>>',error)


    if(!error.response ){
      throw new Error('没有登录');
    }
    if(error.response){
      if(error.response.status === 401){
        if (__SERVER__ === false) {
          location.href = '/login'
        }
        throw new Error('没有登录')
      }

      if(error.response.status === 404){
        throw new Error('页面不存在')
      }
    }
    throw error

    // if (!error.response || (error.response && error.response.status === 401)) {
    //   if (__SERVER__ === false) {
    //     location.href = '/login'
    //   }
    //   throw new Error('没有登录')
    // } else {
    //   throw error
    // }
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(function (config) {

  config.headers['Authorization'] = __SERVER__ ? global.__SERVER_TOKEN__ : (Cookie.get()['token'] || '');
  return config;
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  return data
}, function (error) {
  return Promise.reject(error)
})

const middlewares = [asyncMiddleware({
  http: axios,
  ...asyncHandler
})]

export default (initialState) => {
  // console.log(initialState)
  const store = createStore(null, initialState, middlewares);
  // console.log(store.getState());

  InjectReducerManager.with(store);
  return store;
}



