const webpack = require('webpack');
const config = require('../../config/webpack.config.server');
const constantCode = require('./constant');

config.mode = 'development' //设置编译模式

const compiler = webpack(config);
const watching = compiler.watch({
  aggregateTimeout: 300,
  ignored: /node_modules/,
  poll: 2000,
  'info-verbosity': 'verbose'
},(err,stats) => {
  let json = stats.toJson('minimal');

  if(json.errors){
    json.errors.forEach(item => {
      console.log(item);
    })
  }

  if(json.warnings){
    json.warnings.forEach(item => {
      console.log(item);
    })
  }
  try{
    console.log(constantCode.SVRCODECOMPLETED)
  }
  catch(error){
    console.log(error)
  }
});

compiler.hooks.done.tap('done',function(data){
  console.log(constantCode.SVRCODECOMPLETED)
  console.log('\n svr code done 123' ); //编译完成的时候  可以监听每次的监听
});

//收到退出信号 退出自身进程
process.stdin.on('data', function (data) {
  if (data.toString() === 'exit') {
    process.exit();
  }
});
