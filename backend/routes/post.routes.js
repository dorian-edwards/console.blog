const express = require('express')
const postController = require('../controllers/post.controller')
const authController = require('../controllers/auth.controller')
const imgUpload = require('../utils/imgUpload')

const router = express.Router()

router
  .route('/')
  .get(postController.fetchAll)
  .post(authController.validate, postController.create)

router
  .route('/:id')
  .get(postController.fetchSingle)
  .patch(
    authController.validate,
    authController.checkAuthor,
    imgUpload('img'),
    postController.update
  )
  .delete(
    authController.validate,
    authController.checkAuthor,
    postController.delete
  )

router.post('/:id/like', authController.validate, postController.toggleLike)

module.exports = router
