const express = require('express');
const timeout = require('connect-timeout');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser') ;
const { asyncWrap } = require('src/utils/helper');
const reactSsr  = require('src/server/middlewares/react-ssr').default;

const app = express();
const TIME_OUT = 30 * 1e3;

const render = async function(req,res){
  const data = await reactSsr(req);
  const { html,template,context } = data;
  
  let htmlStr = template.replace("<!--react-ssr-outlet-->", `<div id='root'>${html}</div><textarea id="ssrTextInitData" style="display:none;"> ${JSON.stringify(context)}</textarea>`);

  res.send(htmlStr);
}

const proxyOption = {
  	target: 'http://localhost:9999',
    changeOrigoin:true,
    onProxyReq: function(proxyReq, req, res){
      console.log(proxyReq.cookies,req)
    }

};
app.use(cookieParser());
app.use('/api', createProxyMiddleware(proxyOption));
app.use(express.static('dist/static'));
app.use(express.static('static'));
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.get('*',asyncWrap(render));
app.listen(9001);

console.log('server is start .9001');