# WeiNote
![docker](https://github.com/yueyericardo/WeiNote/workflows/Docker%20Release/badge.svg)  
[English](https://github.com/yueyericardo/WeiNote/blob/master/README.md) | [简体中文](https://github.com/yueyericardo/WeiNote/blob/master/README-ZH.md)  
像发微博一样写笔记  
[Demo](https://demo.weinote.cc/notes)

灵感来源于
1. [卢昌海](https://www.changhai.org/index.php)的[微言小义](https://www.changhai.org/articles/miscellaneous/blog/201906.php)
2. 有些朋友在word上敲snippet，记录一些常用的command，我推荐他们在github建立了repo直接改README。  
后来发现自己这个项目如果添加多标签的功能，更适合来记录 wiki，于是将代码整理出来开源了。

<p class="img">
<a class="link"  href="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot1.png">
<img width=49%  src="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot1.png"></a>
<a class="link"  href="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot2.png">
<img width=49%  src="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot2.png"></a>
</p>

## 1. Features
特色
- 多标签
- Markdown 语法
- Latex 公式
- 支持私有模式 仅自己可见
- 快捷键

编辑器
- Codemirror Markdown 编辑器
- 列表连续输入
- 列表对齐 (`Tab` and `Shift + Tab`)

其他功能
- Markdown 预览 (参考 github preview or `Ctrl + Space`)
- 源代码 Raw content (参考 github)
- 设置单个笔记仅自己可见
- 笔记置顶
- 笔记归档

## 2. Demo
https://demo.weinote.cc  
demo 账户: weinote  
demo 密码: 9vzVABUa30LSldiVVJt5  

## 3. 使用 Docker 安装
#### 安装
```bash
cd directory/you/want/to/run
mkdir weinote && cd weinote
wget https://raw.githubusercontent.com/yueyericardo/WeiNote/master/docker-compose.yml && wget https://raw.githubusercontent.com/yueyericardo/WeiNote/master/init-mongo.sh && chmod +x init-mongo.sh
docker-compose up -d
```
访问 http://example.com:3081 注册 （默认端口号为 3081）

#### 禁用注册功能  
注册之后，将`docker-compose.yml`中的`allow_signup: "true"`改为`allow_signup: "false"`，可以禁用注册功能。完成后用以下命令重新启动
```
docker-compose up -d
```
#### 代理
使用 Nginx 设置域名，[Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) 配置 https

#### 更新版本
```
docker-compose down && docker-compose pull && docker-compose up -d
```
#### 运行更多实例
支持运行多个示例，例如生活感想笔记、学习工作笔记，使用不同的实例。请参考注释好的配置文件
https://github.com/yueyericardo/WeiNote/blob/master/docker-compose.multi.yml

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

- Common
  - **E** : 编辑选中的笔记
  - **D** : 删除选中的笔记
  
## 5. Contribute
欢迎PR，尤其是安全问题！

  
## 6. Acknowledge
本项目基于[N-blog](https://github.com/nswbmw/N-blog)精简修改  
[License GPL](https://github.com/yueyericardo/WeiNote/blob/master/LICENSE)
