// import { reducer as userInfoReducer } from 'src/client/common-components/header/redux';
import { axiosCreater } from 'utils/http/axios';
import asyncHandler from 'utils/asyncHandler';
import { createStore, asyncMiddleware } from 'utils/redux';

export const axios = axiosCreater({
  baseURL: '/',
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  failMiddleware: (error) => {
    if (!error.response || (error.response && error.response.status === 403)) {
      location.href = __BASENAME__ + 'login'
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
  if (config.url.charAt(0) !== '/') {
    config.url = '/' + config.url
  }
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  if (data.code && data.code != '000000') {
    return Promise.reject(response)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

const initialState = {}
const reducer = {
  userInfo: userInfoReducer
}

const middlewares = [asyncMiddleware({
  http: axios,     
  ...asyncHandler
})]

export default createStore.bind(null,reducer, initialState, middlewares);
