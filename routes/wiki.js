const express = require('express')
const router = express.Router()

let date = require('date-and-time');
var http = require('http');
const htmlToText = require('html-to-text');
 
const checkLogin = require('../middlewares/check').checkLogin
const WikiModel = require('../models/wiki')

router.post('/create', checkLogin, function (req, res, next) {
  const author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var tag = req.fields.tag;
  var top = (req.fields.is_top === 'true')
  var hide = (req.fields.is_hide === 'true')
  var postdate = req.fields.postdate;
  var mydate = date.parse(postdate, 'YYYY-MM-DD');
  var postdate = date.format(mydate, 'MMM DD YYYY');
  var mydate = date.format(mydate, 'YYYY-MM-DD');

  if (req.fields.new_tag != '') {
  	tag = req.fields.new_tag;
  	console.log("there are new tags");
  }
  let post = {
    author: author,
    title: title,
    content: content,
    postdate: postdate,
    mydate: mydate,
    tag: tag,
    top: top,
    hide: hide,
  }
  console.log(req.fields.new_tag);
  WikiModel.create(post)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0]
      req.flash('success', 'Posted Successfully')
      res.redirect(`/note/${post._id}`)
    })
    .catch(next)
})

router.get('/create', checkLogin, function (req, res, next) {
  var timezoneoffset = -4;
  now = date.addHours(new Date(), timezoneoffset);
  now = date.format(now, 'YYYY-MM-DD');
  const postId = req.params.postId;
  const author = req.session.user.name;

  var title = null;
  var content = null;
  var tag = 'others';
  var top = false;
  var hide = false;
  var postdate = now;
  var mydate = now;
  WikiModel.getAllTags()
    .then(function (tags) {

		let post = {
			title: title,
			content: content,
			postdate: postdate,
			mydate: mydate,
			tag: tag,
			top: top,
			hide: hide,
			tags: tags
		}

		res.render('wiki_create', {
			post: post
		})

    })
})


router.get('/:postId', function (req, res, next) {
  const postId = req.params.postId;
  // const author = req.session.user._id
  WikiModel.getPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('Wiki does not exist')
      }

        WikiModel.getAllTags()
		    .then(function (tags) {
				post.tags = tags
				res.render('wiki_detail', {
					post: post
			})
	    });
		});
})

router.get('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id
  WikiModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('This Note does not Exsit')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('No Access to This Note')
      }

        WikiModel.getAllTags()
		    .then(function (tags) {
				post.tags = tags
				res.render('wiki_create', {
					post: post
			})
	    });
    })
    .catch(next)
})

router.post('/:postId/edit', checkLogin, function (req, res, next) {

  const postId = req.params.postId;
  const author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  var tag = req.fields.tag;
  var top = (req.fields.is_top === 'true')
  var hide = (req.fields.is_hide === 'true')
  var postdate = req.fields.postdate;

  var mydate = date.parse(postdate, 'YYYY-MM-DD');
  var postdate = date.format(mydate, 'MMM DD YYYY');
  var mydate = date.format(mydate, 'YYYY-MM-DD');

  if (req.fields.new_tag != '') {
  	tag = req.fields.new_tag;
  	console.log("there are new tags");
  }

  let wiki = {
    author: author,
    title: title,
    content: content,
    postdate: postdate,
    mydate: mydate,
    tag: tag,
    top: top,
    hide: hide,
  }

  WikiModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('This Note does not Exsit')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('No Access to This Note')
      }

      WikiModel.updatePostById(postId, wiki)
        .then(function () {
          req.flash('success', 'Updated Successfully')
          res.redirect(`/notes#${post._id}`)
        })
        .catch(next)
    })
})

router.get('/:postId/toggleHide', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  WikiModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('This Note does not Exsit')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('No Access to This Note')
      }
      post.hide = !post.hide;
      post.author = post.author._id;
      WikiModel.updatePostById(postId, post)
        .then(function () {
          req.flash('success', 'Updated');
          res.redirect(`/notes/all#${postId}`);
        })
        .catch(next)
    })
})

router.get('/:postId/toggleTop', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  WikiModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('This Note does not Exsit')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('No Access to This Note')
      }
      post.top = !post.top;
      post.author = post.author._id;
      console.log(url);
      WikiModel.updatePostById(postId, post)
        .then(function () {
          req.flash('success', 'Updated');
          res.redirect(`/notes/all#${postId}`);
        })
        .catch(next)
    })
})


router.get('/:postId/toggleArchive', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  WikiModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('This Note does not Exsit')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('No Access to This Note')
      }
      post.archive = !post.archive;
      post.author = post.author._id;
      WikiModel.updatePostById(postId, post)
        .then(function () {
          req.flash('success', 'Updated');
          res.redirect(`/notes/all#${postId}`);
        })
        .catch(next)
    })
})


router.get('/:postId/remove', checkLogin, function (req, res, next) {
  const postId = req.params.postId
  const author = req.session.user._id

  WikiModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('This Note does not Exsit')
      }
      if (post.author._id.toString() !== author.toString()) {
        throw new Error('No Access to This Note')
      }
      WikiModel.delPostById(postId)
        .then(function () {
          req.flash('success', 'Deleted Successfully')
          res.redirect('/notes')
        })
        .catch(next)
    })
})

module.exports = router
