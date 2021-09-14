const express = require('express')
const { userValidation } = require('../validators/userValidation')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router = express.Router()

router.post('/signup', userValidation, authController.signup)
router.post('/login', authController.login)

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

module.exports = router
