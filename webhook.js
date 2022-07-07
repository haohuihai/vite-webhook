let http = require('http')
let crypto = require('crypto');
// var spawn = require('child_precess').spawn;
// let sendMail = require('./sendMail');

const SECRET = '123456';
function sign(data) {
  return 'sha1='+crypto.createHmac('sha1',SECRET).update(data).digest('hex')
}
let server = http.createServer(function(req,res){
  console.log(req.method,req.url);
  if(req.url == '/webhook' && req.method =='POST') {
    let buffers = [];
    req.on('data',function(data) {
      buffers.push(data)
    })
    req.on('end', function() {
      let body = Buffer.concat(buffers);
      let sig = req.headers['x-hub-signature'];
      let event = req.headers['x-github-event'];
      let id = req.headers['x-github-delivery'];
      if(sig !== sign(body)) {
        return res.end('Not Allowed')
      }
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({"ok": true}))
      if(event === 'push'){
        console.log('body',body)
      }
    })

  } else {
    res.end('Now Found!');
  }
})
server.listen(4000, () => {
  console.log('服务正在4000端口上启动!');
})