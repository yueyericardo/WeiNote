module.exports = {
  port: 8081,
  session: {
    secret: 'weinote',
    key: 'WeiNote',
    maxAge: 2592000000
  },
  allow_signup: true,
  mongodb: 'mongodb://username:password@xxx.mlab.com:port/datebase'
}
