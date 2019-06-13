const express = require('express')
const router = express.Router()

let date = require('date-and-time');
var http = require('http');
const htmlToText = require('html-to-text');
 
const checkLogin = require('../middlewares/check').checkLogin
const WikiModel = require('../models/wiki')

router.get('/', function (req, res, next) {
  const author = req.query.author
  WikiModel.getPosts(author)
    .then(function (posts) {
        WikiModel.getAllTags()
		    .then(function (tags) {
				posts.tags = tags
				res.render('wiki', {
					posts: posts
			})
	    });
    })
    .catch(next)
})

router.get('/tag/:tagId', function (req, res, next) {
  const tagId = req.params.tagId;
  const author = req.query.author

	WikiModel.getPostsByTag(author,tagId)
	    .then(function (posts) {
	      if (!posts) {
	        throw new Error('Wiki does not exist')
	      }
        WikiModel.getAllTags()
		    .then(function (tags) {
				posts.tags = tags;
				posts.tag = tagId;
				res.render('wiki_by_tag', {
					posts: posts
			})
	    });
    })
})

// router.get('/random', function (req, res, next) {
//   const author = req.query.author

//   WikiModel.getNoneHiddenPosts(author)
//     .then(function (posts) {
// 		String.prototype.format = function() {
// 		    var formatted = this;
// 		    for( var arg in arguments ) {
// 		        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
// 		    }
// 		    return formatted;
// 		};
//     	random_idx = Math.floor(Math.random() * posts.length);
// 	    random_post = posts[random_idx]
// 	    const text = htmlToText.fromString(random_post.content, {
// 		  wordwrap: 130
// 		});

// 	    var obj = {date:random_post.mydate, content: text, tag: random_post.tag};
// 	    console.log(obj);
// 		res.statusCode = 200;
// 		// res.setHeader('Content-Type', 'application/json');
// 		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
// 		output = "{0} {1} \n\n{2}\n".format(random_post.mydate, random_post.tag, text)
// 		res.end(output)
// 	    // res.end(JSON.stringify(obj));
//     })
// })



module.exports = router
