const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/togglePrivate', checkLogin, function (req, res, next) {
    const authorId = req.session.user._id;

    UserModel.getUserById(authorId)
    .then(function (result) {
      if (!result) {
        throw new Error('User does not Exsit')
      }
      console.log(result.private);
      result.private = result.private == null ? false : result.private;
      result.private = ! result.private;

      UserModel.updateUserById(authorId, result)
        .then(function () {
          req.flash('success', `Updated, private: ${result.private}`);
          res.redirect(`/notes`);
        })
        .catch(next)
    })
})

module.exports = router
