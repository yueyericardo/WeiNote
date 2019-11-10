# WeiNote
像发微博一样写笔记  
[Demo1](https://demo.weinote.cc/notes)  |  [Demo2](https://wiki.yyrcd.com/notes)  

灵感来源于
1. [卢昌海](https://www.changhai.org/index.php)的[微言小义](https://www.changhai.org/articles/miscellaneous/blog/201906.php)。去年自建了一个类似的后端站点，写点bullshit。
2. 有些朋友在word上敲snippet，记录一些常用的command，我推荐他们在github建立了repo直接改README。  
后来发现自己的bullshit如果添加多标签的功能，更适合来做小wiki，于是将bullshit整理出来开源了。

<p class="img">
<a class="link"  href="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2019-06-13-222357.png">
<img width=49%  src="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2019-06-13-222357.png"></a>
<a class="link"  href="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2019-06-13-222927.png">
<img width=49%  src="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2019-06-13-222927.png"></a>
</p>

# Table of contents

* [1. Features](#1-features)
* [2. Demo](#2-demo)
* [2. Requirement](#2-requirement)
* [4. Install](#4-install)
* [5. Configuration](#5-configuration)
* [6. Run in production](#6-run-in-production)
* [7. Debug](#7-debug)
* [8. Contribute](#8-contribute)
* [9. Acknowledge](#9-acknowledge)

## 1. Features
- 多标签 
- Markdown
- 可设置本条note仅自己可见
- 可设置多条note置顶
- 个人使用（支持多用户，但不推荐）

## 2. Demo
http://weinote-demo.yyrcd.com  
demo账户: weinote  
demo密码: 9vzVABUa30LSldiVVJt5  

## 2. Requirement
- Mongodb  
推荐使用[mlab](https://mlab.com/)，有500M免费存储空间
- Node  
推荐使用[nvm](https://blog.pm2.io/2018-02-19/Installing-Node-js-with-NVM/)配置Node

## 4. Install
```bash
cd directory/you/want/to/run
git clone git@github.com:yueyericardo/WeiNote.git
npm install
```

## 5. Configuration
```bash
vim config/default.js
```
- port
- allow_signup，自己注册完之后，设置为false，会禁止注册
- mongodb，mlab建好之后的database url，格式如`mongodb://username:password@xxx.mlab.com:port/datebase`
- session.maxAge，session有效期，单位为ms，过期后需要重新登录，这里设置的是30天
```json
{
  "port": 8086,
  "session": {
    "secret": "weinote",
    "key": "WeiNote",
    "maxAge": 2592000000
  },
  "allow_signup": true,
  "mongodb": "mongodb://username:password@xxx.mlab.com:port/datebase"
}
```

## 6. Run in production
- pm2 
```
npm install pm2 -g
pm2 start app.js --name WeiNote
```
- nginx 设置域名

## 7. Debug
```
npm install supervisor -g
supervisor app
```

## 8. Contribute
欢迎PR，尤其是安全问题！

## 9. Acknowledge
本项目基于[N-blog](https://github.com/nswbmw/N-blog)精简修改  
[License GPL](https://github.com/yueyericardo/WeiNote/blob/master/LICENSE)
