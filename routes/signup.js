const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const bansignup = require('../middlewares/check').bansignup

let allow_signup = process.env.allow_signup || config.get('allow_signup');
if (allow_signup === 'true' ||  allow_signup === true){
    allow_signup = true
}else{
    allow_signup = false
}

if (allow_signup) {
    // GET /signup 开放注册
    router.get('/', checkNotLogin, function (req, res, next) {
      res.render('signup')
    })
}else{
    // GET /signup 禁止注册
    router.get('/', checkNotLogin, bansignup, function (req, res, next) {
      res.render('signup')
    })
}

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  const name = req.fields.name
  const gender = req.fields.gender
  const bio = req.fields.bio
  const avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  const repassword = req.fields.repassword

  // 校验参数
  try {
    if (!(name.length >= 3 && name.length <= 16)) {
      throw new Error('Limit username to 3-16 letters')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('only m、f or x')
    }
    // if (!(bio.length >= 1 && bio.length <= 30)) {
    //   throw new Error('个人简介请限制在 1-30 个字符')
    // }
    if (!req.files.avatar.name) {
      throw new Error('Please Upload one avatar')
    }
    if (password.length < 10) {
      throw new Error('At least 10 letters for password')
    }
    if (password !== repassword) {
      throw new Error('Two passwords are different')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    req.flash('error', e.message)
    fs.unlink(req.files.avatar.path)
    return res.redirect('/signup')
  }

  // 明文密码加密
  password = sha1(password)

  // 待写入数据库的用户信息
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  // 用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {
      // 此 user 是插入 mongodb 后的值，包含 _id
      user = result.ops[0]
      // 删除密码这种敏感信息，将用户信息存入 session
      delete user.password
      req.session.user = user
      // 写入 flash
      req.flash('success', 'Signup Successfully')
      // 跳转到首页
      res.redirect('/notes')
    })
    .catch(function (e) {
      // 注册失败，异步删除上传的头像
      fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        req.flash('error', 'Username has been used')
        return res.redirect('/signup')
      }
      next(e)
    })
})

module.exports = router
