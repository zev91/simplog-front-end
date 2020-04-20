import routes from 'src/router';//得到动态路由的配置
import proConfig from '../../share/pro-config';

const checkIsAsyncRoute = (component) => {
  return component[proConfig.asyncComponentKey];
}

//将路由转换为静态路由
async function getStaticRoutes() {

  const key ='__dynamics_route_to_static';
  if (global[key]){
      return global[key];
  }

  let len = routes.length,
      i = 0;
  const staticRoutes = [];

  for (; i < len; i++) {
      // console.log(routes[i])
      let item = routes[i];
      // const comp = (await item.component().props.load()).default;'
      item.component().props.load().then(res => {
        console.log({
          path: item.path,
          res
        })
      },error => {
        console.log({
          path: item.path,
          error
        })
      })
    
      // console.log({name:item.path,item:item.component().props.load()})
      if (checkIsAsyncRoute(item.component)) {
          staticRoutes.push({
              ...item,
              ...{
                  component: (await item.component().props.load()).default
              }
          });
      } else {
          staticRoutes.push({
              ...item
          });
      }
  }
  global[key]=staticRoutes;
  return staticRoutes; //返回静态路由
}

export default getStaticRoutes;