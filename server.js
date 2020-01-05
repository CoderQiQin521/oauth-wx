const express = require('express')
const app = express()
const axios = require('axios')
const config = require('./config')


app.use(require('cors')())
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/user.html')
})

/* ---------------------------------- 后端逻辑 ---------------------------------- */

app.get('/auth', (req, res) => {
  let { cb } = req.query
  if (!cb) {
    res.json('请填写回调地址')
  }
  // 后端重定向(总是跨域) 或者  url 返回前端跳转
  let urls = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=http://server.utools.club/token&response_type=code&scope=snsapi_userinfo&state=' + cb + '#wechat_redirect'
  // res.send(urls);
  res.redirect(301, urls)
})


app.get('/token', (req, res) => {
  let { code, state } = req.query
  let accessUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appsecret}&code=${code}&grant_type=authorization_code`

  axios.get(accessUrl).then(token => {
    let { access_token, opendid } = token.data

    axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${opendid}&lang=zh_CN`).then(userinfo => {
      console.log('userinfo: ', userinfo.data);
      // state += '?token=' + Date.now()
      state += '?userinfo=' + encodeURIComponent(JSON.stringify(userinfo.data))
      // console.log('state: ', state);
      res.redirect(301, state)
    })

  })

})

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('服务已启动, http://%s:%s', host, port);
})