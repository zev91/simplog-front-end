import axios from 'axios';

const activitySiteSuccessMiddleware = (response) => {
  if (response.staus === 200) {
    //to do
  }
  return response;
}

const activitySiteFailMiddleware = (error) => {
  // 此处页面即使已经跳转到login仍然会进入。
  if (error.response.status === 403) {
    location.href= __BASENAME__ + 'login';
    throw new Error('没有登录');
  }
  return Promise.reject(error);
}

export const axiosCreater = (projectHttpConfig) => {
  const config = {};
  const instance = axios.create({
    ...config,
    ...projectHttpConfig
  });
  // 添加各个项目的拦截器
  instance.interceptors.response.use(
    projectHttpConfig.successMiddleware || activitySiteSuccessMiddleware,
    projectHttpConfig.failMiddleware || activitySiteFailMiddleware
  )
  return instance;
}
