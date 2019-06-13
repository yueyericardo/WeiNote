module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录')
      return res.redirect('/signin')
    }
    next()
  },

  bansignup: function bansignup (req, res, next) {
    req.flash('error', '暂不开放注册')
    return res.status(404).render('404')
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录')
      return res.redirect('/notes')// 返回之前的页面
    }
    next()
  }
}
