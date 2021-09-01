const express = require('express')
const postController = require('../controllers/post.controller')

const router = express.Router()

router.route('/').get(postController.fetchAll).post(postController.create)

router
  .route('/:id')
  .get(postController.fetchSingle)
  .patch(postController.update)
  .delete(postController.delete)

module.exports = router
