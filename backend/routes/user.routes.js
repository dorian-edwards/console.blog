const express = require('express')
const { userValidation } = require('../validators/userValidation')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router = express.Router()

router.post('/signup', userValidation, authController.signup)
router.post('/login', authController.login)

router
  .route('/')
  .get(authController.validate, userController.fetchAll)
  .post(userValidation, userController.create)

router
  .route('/:id')
  .get(userController.fetchSingle)
  .patch(userController.update)
  .delete(userController.delete)

module.exports = router
