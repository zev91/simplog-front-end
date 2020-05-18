//生产环境中 静态资源的处理
const proConfig = require('src/share/pro-config');
module.exports = function () {
  // let devHost =   'http://localhost:'+proConfig.wdsPort;
  let devHost = '/source';

  let jsFiles = ['libs.js', 'main.js'];
  let cssFiles = ['main.css'];

  const assets = {
    js: [],
    css: []
  };

  console.log(__IS_PROD__)
  if (!__IS_PROD__) {//开发环境
    // let devHost =   'http://localhost:'+proConfig.wdsPort;
    assets.js.push(`<script type="text/javascript"  src="${devHost}/libs.js"></script>`);
    assets.js.push(`<script type="text/javascript"  src="${devHost}/main.js"></script>`);
    assets.css.push(`<link rel="stylesheet" type="text/css" href="${devHost}/main.css" />`);
  } else {
    //生产环境 从 asset-manifest.json 读取资源
    const map = require('dist/server/asset-manifest.json');
    jsFiles.forEach(item => {
      if (map[item])
        assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
    });
    cssFiles.forEach(item => {
      if (map[item])
        assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
    });
  }

  return assets;
}