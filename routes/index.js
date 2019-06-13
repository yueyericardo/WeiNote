module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/signin')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/note', require('./wiki'))
  app.use('/notes', require('./wikis'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      // res.redirect('/notes'),
      res.status(404).render('404')
    }
  })
}
