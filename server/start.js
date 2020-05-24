const { spawn } = require('child_process');
const constantCode = require('./scripts/constant');
const chalk = require('chalk'); //为控制台输出的信息增加点色彩
const log = console.log;
const proConfig = require('../src/share/pro-config');
const nodeServerPort = proConfig.nodeServerPort;

log(chalk.red('servers starting...'));

const feCodeWatchProcess = spawn('npm',['run','wds:watch'],{stdio:'inherit',shell: process.platform === 'win32'});
const svrCodeWatchProcess = spawn('npm',['run','server:watch'],{shell: process.platform === 'win32'});

//node 服务
let nodeServerProcess = null;
const startNodeServer = () => {
  nodeServerProcess && nodeServerProcess.kill();
  try{
    // nodeServerProcess = spawn('node',['-v'],{shell: process.platform === 'win32'});
    nodeServerProcess = spawn('node',['./server/scripts/svr-dev-server.js'],{shell: process.platform === 'win32'});
  }


  catch(error){
    console.error(error)
  }
  nodeServerProcess.stdout.on('data', print);
}

function print(data){
  let str = data.toString();
  // console.log(str.indexOf(constantCode.SVRCODECOMPLETED) > -1)
  if(str.indexOf(constantCode.SVRCODECOMPLETED) > -1){
    startNodeServer();//重启 node 服务
  }else{
    console.log(str);
  }
}

svrCodeWatchProcess.stdout.on('data',print);

const killChild = () => {
  nodeServerProcess && nodeServerProcess.kill();
  feCodeWatchProcess && feCodeWatchProcess.kill();
  svrCodeWatchProcess && svrCodeWatchProcess.kill();
}

//主进程关闭退出子进程
process.on('close', (code) => {
  console.log('main process close', code);
  killChild();
});
//主进程关闭退出子进程
process.on('exit', (code) => {
  console.log('main process exit', code);
  killChild();
});

//非正常退出情况
process.on('SIGINT', function () {
  svrCodeWatchProcess.stdin.write('exit', (error) => {
      console.log('svr code watcher process exit!');
  });
  killChild();
});


