# WeiNote
![docker](https://github.com/yueyericardo/WeiNote/workflows/docker/badge.svg)  
[English](https://github.com/yueyericardo/WeiNote/blob/master/README.md) | [简体中文](https://github.com/yueyericardo/WeiNote/blob/master/README-ZH.md)  
Keep a note just like post a weibo    
[Demo](https://demo.weinote.cc/notes)

<p class="img">
<a class="link"  href="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2019-06-13-222357.png">
<img width=49%  src="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2019-06-13-222357.png"></a>
<a class="link"  href="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2020-03-23-030759.png">
<img width=49%  src="https://yyrcd-1256568788.cos.na-siliconvalley.myqcloud.com/yyrcd/2020-03-23-030759.png"></a>
</p>

## 1. Features
Main
- Multi tags 
- Markdown
- Latex
- Support fully private mode
- Shortcuts

Editor
- Codemirror Markdown Editor
- Continued List
- Auto Indent List (`Tab` and `Shift + Tab`)

Functions
- Markdown Preview (like github preview or `Ctrl + Space`)
- Raw content (like github)
- Hide a note
- Top a note
- Archive a note

## 2. Demo
https://demo.weinote.cc  
demo user: weinote  
demo pw: 9vzVABUa30LSldiVVJt5  

## 3. Install with Docker
- Install
  ```bash
  cd directory/you/want/to/run
  git clone git@github.com:yueyericardo/WeiNote.git
  cd WeiNote
  sudo docker-compose up -d
  ```
  The default port is 3081, e.g.: http://example.com:3081  
- Disable Sign Up  
  After you sign up，in file `docker-compose.yml`, change `allow_signup: "true"` to `allow_signup: "false"`，So others cannot sign up.  
- Reload
  ```
  sudo docker-compose up -d
  ```
- Use Nginx for your domain ，and [Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) for https


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
  - **E** : Edit selected note
  - **D** : Delete selected note

## 5. Contribute
Welcome PR! Especially for security problems.

## 6. Acknowledge
Based on [N-blog](https://github.com/nswbmw/N-blog)  
[License GPL](https://github.com/yueyericardo/WeiNote/blob/master/LICENSE)
