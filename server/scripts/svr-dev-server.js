const proConfig = require('../../src/share/pro-config');

const nodeServerPort = proConfig.nodeServerPort;

require('./free-port')(nodeServerPort);
try{require('../../dist/server/app')}
catch(error){
  console.log(error)
}

