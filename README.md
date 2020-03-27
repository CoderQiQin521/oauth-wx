# OAth2.0之微信登录授权

## 协议介绍
当你开始使用一个网站还是手机应用的时候, 那么第一步很有可能是从注册开始的,  从最初一丝不苟的填写一串表单注册,到使用短信验证码注册, 体验越来越好, 不过这个时候也会带来几个问题:
- 用户还是感觉麻烦进而不再注册,懒惰是人类的发展一大动力
- 越来越多的账号需要记忆,忘记账号的情况也越来越多
- 注册之后没有社交关系
- 个人资料的设置
采用授权方式的OAuth2.0协议的出现解决了以上的各种问题,什么是OAuth2.0呢

![一图顶千言](https://s2.ax1x.com/2020/01/06/lrs8SO.png)

1. (引导用户发起授权请求)客户端向用户询问,用户允许授权
2. 获取到`code`和`state`
3. 将`code`发送给服务端, 服务端携带`code`请求验证服务器,获取`OpenID`和`Access Token`
4. 根据`OpenID`和`Access Token`,继续请求资源服务器,获取用户信息

![一图顶千言](https://s2.ax1x.com/2020/01/06/lrrLJf.jpg)

现在流程已经比较清晰了,其中步骤1,步骤2是前端处理,后面是服务端处理,可以将用户信息存到用户表,并生成token返回前端用于身份校验


## 微信对接
[官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
> 1、在微信公众号请求用户网页授权之前，开发者需要先到公众平台官网中的“开发 - 接口权限 - 网页服务 - 网页帐号 - 网页授权获取用户基本信息”的配置选项中，修改授权回调域名。请注意，这里填写的是域名（是一个字符串），而不是URL，因此请勿加 http:// 等协议头；
> 2、授权回调域名配置规范为全域名，比如需要网页授权的域名为：www.qq.com，配置以后此域名下面的页面http://www.qq.com/music.html 、 http://www.qq.com/login.html 都可以进行OAuth2.0鉴权。但http://pay.qq.com 、 http://music.qq.com 、 http://qq.com无法进行OAuth2.0鉴权

3、如果公众号登录授权给了第三方开发者来进行管理，则不必做任何设置，由第三方代替公众号实现网页授权即可
1. 第一步：用户同意授权，获取code
2. 第二步：通过code换取网页授权access_token
3. 第三步：刷新access_token（如果需要）
4 第四步：拉取用户信息(需scope为 snsapi_userinfo)

## 三种思路


## 调试
使用内网穿透,代理域名
最后放上`node`写了一个demo, 源码地址<iframe
    style="margin-left: 2px; margin-bottom:-5px;"
    frameborder="0" scrolling="0" width="91px" height="20px"
    src="https://ghbtns.com/github-btn.html?user=coderqiqin521&repo=oauth-wx&type=star&count=true" >
</iframe>
<!-- [源码地址: https://github.com/CoderQiQin521/oauth-wx 欢迎star](https://github.com/CoderQiQin521/oauth-wx) -->
