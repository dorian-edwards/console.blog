const express = require('express')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router = express.Router()

router
  .route('/')
  .all(authController.validate)
  .get(userController.fetchAll)
  .post(userController.create)

router
  .route('/:id')
  .all(authController.validate)
  .get(userController.fetchSingle)
  .patch(authController.checkUser, userController.update)
  .delete(authController.checkUser, userController.delete)

router
  .route('/:id/posts')
  .all(authController.validate)
  .get(userController.fetchByAuthor)

module.exports = router
