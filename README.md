<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/image.png" align="center" alt="Weinote" />
 <h1 align="center">WeiNote</h1>
</p>
<p align="center">Keep a note just like post a weibo!</p>
<p align="center">
  <img alt="docker" src="https://github.com/yueyericardo/WeiNote/workflows/Docker%20Release/badge.svg" />
</p>
<p align="center">
  <a href="https://demo.wnote.cc/notes" rel="nofollow" class="rich-diff-level-one">View Demo</a>
  <br>
  <a href="https://github.com/yueyericardo/WeiNote/blob/master/README.md" class="rich-diff-level-one">English</a>
  ·
  <a href="https://github.com/yueyericardo/WeiNote/blob/master/README-ZH.md" class="rich-diff-level-one">简体中文</a>
</p>


<p class="img">
<a class="link"  href="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot1.png">
<img width=49%  src="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot1.png"></a>
<a class="link"  href="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot2.png">
<img width=49%  src="https://raw.githubusercontent.com/yueyericardo/WeiNote/master/screenshots/screenshot2.png"></a>
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
https://demo.wnote.cc  
demo user: weinote  
demo pw: 9vzVABUa30LSldiVVJt5  

## 3. Install with Docker
#### Install
```bash
cd directory/you/want/to/run
mkdir weinote && cd weinote
wget https://raw.githubusercontent.com/yueyericardo/WeiNote/master/docker-compose.yml && wget https://raw.githubusercontent.com/yueyericardo/WeiNote/master/init-mongo.sh && chmod +x init-mongo.sh
docker-compose up -d
```
Signup, the default port is 3081, e.g.: http://example.com:3081  
#### Disable signup
After you signup，in file `docker-compose.yml`, change `allow_signup: "true"` to `allow_signup: "false"`，So others cannot sign up. After update, you can reload weinote with the following
```
docker-compose up -d
```
#### Proxy
Use Nginx for your domain，and [Certbot](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx) for https
#### Update from the latest image
```
docker-compose down && docker-compose pull && docker-compose up -d
```
#### Multiple instances
You can find how to create multiple instances at the following example (with notes): https://github.com/yueyericardo/WeiNote/blob/master/docker-compose.multi.yml


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
