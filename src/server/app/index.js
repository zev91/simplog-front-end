const express = require('express');
const compression = require('compression')
const timeout = require('connect-timeout');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser') ;
const { asyncWrap } = require('src/utils/helper');
const reactSsr  = require('src/server/middlewares/react-ssr').default;

const app = express();
app.use(compression());
const TIME_OUT = 30 * 1e3;

const render = async function(req,res){
  global.__SERVER_TOKEN__ = req.cookies.token || '';
  global.REQUEST_PATH = req.path;
  try{
    const data = await reactSsr(req);
    const { html,template,context } = data;
    let htmlStr = template.replace("<!--react-ssr-outlet-->", `<div id='root'>${html}</div><textarea id="ssrTextInitData" style="display:none;"> ${JSON.stringify(context)}</textarea>`);
  
    res.send(htmlStr);
  }catch(error){
    if(error.message === '没有登录'){
      res.redirect(302, '/login');
    }
    if(error.message === '页面不存在'){
      res.redirect(302, '/404');
    }
  }
  
}

const proxyOption = {
  target: 'http://localhost:9999',
  changeOrigoin:true
};

app.use(cookieParser());

if(process.env.BABEL_ENV !== 'production'){
  app.use('/api', createProxyMiddleware(proxyOption));
}

app.use(express.static('dist/static'));
app.use(express.static('static'));

// app.use('/static', express.static(__dirname + '/dist/static'));
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.get('*',asyncWrap(render));
app.listen(9001);

console.log('server is start .9001');