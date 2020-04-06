import React from 'react';
const {renderToString} =  require('react-dom/server');
import { matchRoute } from '../../router';
import getAssets from '../../../server/common/assets';
import getStaticRoutes from '../middlewares/get-static-routes';
import { encrypt } from '../../utils/helper';
import proConfig from '../../share/pro-config';

import { StaticRouter, Route} from 'react-router';
import App from '../../client/app/index';

import StyleContext from 'isomorphic-style-loader/StyleContext';


const assetsMap = getAssets();

export default async (req) => {
  let staticRoutes = await getStaticRoutes();
  let targetRoute = matchRoute(req.path,staticRoutes);
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
  const css = new Set();
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getContent()));

  serverEntry = (
      <StaticRouter location={req.path} context={context}>
        <StyleContext.Provider value={{ insertCss }} >
          <App routeList={staticRoutes}></App>
        </StyleContext.Provider>
      </StaticRouter>
  );

  const html = renderToString(serverEntry);
  const styles = [];
  [...css].forEach(item => {
      let [mid, content] = item[0];
      styles.push(`<style id="s${mid}-0">${content}</style>`)
  });

  template = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${tdk.title}</title>
      <meta name="keywords" content="${tdk.keywords}" />
      <meta name="description" content="${tdk.description}" />
     
      ${styles.join('')}
    </head>
    <body>
      <!--react-ssr-outlet-->
    </body>
    ${assetsMap.js.join('')}
    <script>
      window.__IS__SSR__=${proConfig.__IS_SSR__};
    </script>
  </html>`;

  return { html, template, context }
}
