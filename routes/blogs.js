const express = require('express')
const router = express.Router()

let date = require('date-and-time');
var http = require('http');
const htmlToText = require('html-to-text');

const checkLogin = require('../middlewares/check').checkLogin
const WikiModel = require('../models/wiki')

router.get('/', function (req, res, next) {
  const author = req.query.author
  WikiModel.getAllBlogs(author)
    .then(function (posts) {
		res.render('blogs', {
			posts: posts,
		})
    })
    .catch(next)
})

module.exports = router
