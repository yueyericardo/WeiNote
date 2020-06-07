const UserModel = require('../models/users')
const WikiModel = require('../models/wiki')

module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Please Sign in')
      return res.redirect('/signin')
    }
    next()
  },

  checkPrivate: function checkPrivate (req, res, next) {
    UserModel.getFirstUser()
    .then(function (user) {
      console.log(user);
      console.log(user.private);
      console.log(req.session.user);
      if (user.private && !req.session.user) {
        req.flash('error', 'Please Sign in')
        return res.redirect('/signin')
      }
      next()
    })
  },

  bansignup: function bansignup (req, res, next) {
    req.flash('error', 'Sign up is not allowed')
    return res.status(404).render('404')
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('success', 'Welcome Back!')
      return res.redirect('/notes')// 返回之前的页面
    }
    next()
  }
}
