const fs = require('fs')
const path = require('path')
const util = require('util')
const OSS = require('ali-oss')

const config = require('./oss.json')

const promisifyReaddir = util.promisify(fs.readdir)
const promisifyStat = util.promisify(fs.stat)

const ALIOSSKEY = {
  region: config.region,
  key: config.key,
  secret: config.secret,
  bucket: config.bucket
}

const client = new OSS({
  region: ALIOSSKEY.region,
  accessKeyId: ALIOSSKEY.key,
  accessKeySecret: ALIOSSKEY.secret,
  bucket: ALIOSSKEY.bucket
})

const publicPath = path.resolve(__dirname, './dist/static')
const ossPath = 'blog-cdn'
async function run(proPath = '') {
  const oldFiles = await client.list({
  marker: 'blog-cdn'
});

  if(oldFiles.objects){
   const oldFileLists = oldFiles.objects.map(file => file.name);
    await client.deleteMulti(oldFileLists);
  }

  const dir = await promisifyReaddir(`${publicPath}${proPath}`);

  for (let i = 0; i < dir.length; i++) {
    const stat = await promisifyStat(path.resolve(`${publicPath}${proPath}`, dir[i]))

    if (stat.isFile()) {
      const fileStream = fs.createReadStream(path.resolve(`${publicPath}${proPath}`, dir[i]))
      console.log(`上传文件: ${ossPath}${proPath}/${dir[i]}`)
      const result = await client.putStream(`${ossPath+proPath}/${dir[i]}`, fileStream)
    } else if (stat.isDirectory()) {
      await run(`${proPath}/${dir[i]}`)
    }
  }
}

run()
