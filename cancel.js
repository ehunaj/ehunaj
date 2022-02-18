const thrift = require('thrift-http');
const LineService = require('LineService');

var _noobcoder = '';
var gid = '';
var cancel = [];
var token = ''; 

process.argv.forEach(function (val) {
  if(val.includes('gid=')){
    gid = val.split('gid=').pop();
  }else if(val.includes('uid=')){
    cancel.push(val.split('uid=').pop());
  }else if(val.includes('token=')){
    token = val.split('token=').pop();
  }
});

function setTHttpClient(options) {
    var connection =
      thrift.createHttpConnection('legy-jp.line.naver.jp', 443, options);
    connection.on('error', (err) => {
      console.log('err',err);
      return err;
    });
    _noobcoder = thrift.createHttpClient(LineService, connection);
  }
  
  
setTHttpClient(options={
    protocol: thrift.TCompactProtocol,
    transport: thrift.TBufferedTransport,
    headers: {'User-Agent':'Line/2.14.0','X-Line-Application':"ANDROIDLITE\t2.14.0\tAndroid OS\t5.1.1",'X-Line-Access':token},
    path: '/S4',
    https: true
    });

async function func1() {

  let promise1 = new Promise((resolve, reject) => {
    try {
    for (var i=0; i < cancel.length; i++) {
      _noobcoder.cancelGroupInvitation(0, gid, [cancel[i]]);
    }
    resolve("Cancel Done")
    } catch(e) {
    reject(e);
    }
  });
  return promise1;
}

var promise1 = func1();

Promise.all([promise1])
  .then(results => console.log(results));