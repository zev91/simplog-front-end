import React from 'react';
import Index from '../server-entry';
import { matchRoute } from '../../router';
import getAssets from '../../../server/common/assets';
import { encrypt } from '../../utils/helper';

const assetsMap = getAssets();

export default async (req) => {
  let targetRoute = matchRoute(req.path);
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

  serverEntry = <Index location={req.path} context={context} />;

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