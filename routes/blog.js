const express = require('express')
const router = express.Router()

let date = require('date-and-time');
var http = require('http');

const checkLogin = require('../middlewares/check').checkLogin
const WikiModel = require('../models/wiki')

router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId;
  // const author = req.session.user._id
  WikiModel.getPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('Wiki does not exist')
      }
      res.render('blog_detail', {
        post: post
      })
		});
})

module.exports = router
