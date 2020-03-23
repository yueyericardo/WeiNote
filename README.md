# WeiNote
![docker](https://github.com/yueyericardo/WeiNote/workflows/docker/badge.svg)  
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

## 1. Features
- 多标签 
- Markdown
- 可设置本条note仅自己可见
- 可设置多条note置顶
- 个人使用（支持多用户，但不推荐）

## 2. Demo
https://demo.weinote.cc  
demo账户: weinote  
demo密码: 9vzVABUa30LSldiVVJt5  

## 3. Install with Docker
- 安装
  ```bash
  cd directory/you/want/to/run
  git clone git@github.com:yueyericardo/WeiNote.git
  sudo docker-compose up -d
  ```
  默认配置在3081端口，如：http://example.com:3081  
- 禁止其他人注册  
  注册之后，将`docker-compose.yml`中的`allow_signup: "true"`改为`allow_signup: "false"`，可以禁止其他人注册。  
- 重新载入
  ```
  sudo docker-compose up -d
  ```
- Nginx 设置域名，[Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) 配置 https


## 4. Shortcuts
- Mac OS:
  - **Ctrl + N** : Go to `Create page`
  - **Alt  + N** : Open `Create page` at a new page

  - **Ctrl + H** : Go  to `Home page` [/notes](/notes)
  - **Ctrl + A** : Go  to `All notes page` [/notes/all](/notes/all)
  - **Ctrl + C** : Redirect  to `Archive notes page` [/notes/archive](/notes/archive)

- Other System:
  - **Alt + N** : Go to `Create page`

  - **Alt + H** : Go  to `Home page` [/notes](/notes)
  - **Alt + A** : Go  to `All notes page` [/notes/all](/notes/all)
  - **Alt + C** : Redirect  to `Archive notes page` [/notes/archive](/notes/archive)
  
## 5. Contribute
欢迎PR，尤其是安全问题！

  
## 6. Acknowledge
本项目基于[N-blog](https://github.com/nswbmw/N-blog)精简修改  
[License GPL](https://github.com/yueyericardo/WeiNote/blob/master/LICENSE)
