import React from 'react';
import Index from '../server-entry';
import { matchRoute } from '../../router';
import getAssets from '../../../server/common/assets';
import getStaticRoutes from '../middlewares/get-static-routes';
import { encrypt } from '../../utils/helper';

const assetsMap = getAssets();

export default async (req) => {
  let staticRoutes = await getStaticRoutes();
  let targetRoute = matchRoute(req.path,staticRoutes);

  console.log('targetRoute===>>>',targetRoute)
  let serverEntry;
  let template;
  let fetchDataFn = targetRoute ? targetRoute.component.getInitialProps : null;
  let fetchResult = {};

  if (fetchDataFn) {
    fetchResult = await fetchDataFn();
  }

  let { page } = fetchResult || {};
  let tdk = {
    title: '默认标题',
    keywords: '默认关键词',
    description: '默认描述'
  };

  if (page && page.tdk) {
    tdk = page.tdk;
  }

  const context = {
    initialData: encrypt(fetchResult)
  };
  

  serverEntry = <Index location={req.path} context={context} routeList={staticRoutes}/>;

  template = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${tdk.title}</title>
      <meta name="keywords" content="${tdk.keywords}" />
      <meta name="description" content="${tdk.description}" />
      ${assetsMap.css.join('')}
    </head>
    <body>
      <!--react-ssr-outlet-->
    </body>
    ${assetsMap.js.join('')}
  </html>`;

  return { serverEntry, template, context }
}