


const express = require('express');
const path = require('path');
const app = express();
const { asyncWrap } = require('src/utils/helper');
const reactSsr  = require('src/server//middlewares/react-ssr').default;

const render = async function(req,res){
  const data = await reactSsr(req);
  const { html,template,context } = data;
  // const html = renderToString(serverEntry);
  let htmlStr = template.replace("<!--react-ssr-outlet-->", `<div id='root'>${html}</div><textarea id="ssrTextInitData" style="display:none;"> ${JSON.stringify(context)}</textarea>`);

  res.send(htmlStr);
}

app.use(express.static('dist/static'));
app.use(express.static('static'));

app.get('*',asyncWrap(render));
app.listen(9001);

console.log('server is start .9001');