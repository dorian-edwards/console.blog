const express = require('express')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const imgUpload = require('../utils/imgUpload')

const router = express.Router()

router
  .route('/')
  .get(authController.validate, userController.fetchAll)
  .post(userController.create)

router
  .route('/:id')
  .all(authController.validate)
  .get(userController.fetchSingle)
  .patch(authController.checkUser, imgUpload('img'), userController.update)
  .delete(authController.checkUser, userController.delete)

router
  .route('/:id/posts')
  .all(authController.validate)
  .get(userController.fetchByAuthor)

module.exports = router
