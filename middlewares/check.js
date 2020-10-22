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
      if (!user) {
        req.flash('error', 'Please Sign in');
        return res.redirect('/signin');
      }
      if ((user.private && !req.session.user)) {
        req.flash('error', 'Please Sign in')
        return res.redirect('/signin');
      }
      next()
    })
  },

  bansignup: function bansignup (req, res, next) {
    req.flash('error', 'Sign up is not allowed')
    return res.status(404).send('404 Forbidden')
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
