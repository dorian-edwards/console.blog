const express = require('express')
const { userValidation } = require('../validators/userValidation')
const userController = require('../controllers/user.controller')

const router = express.Router()

router
  .route('/')
  .get(userController.fetchAll)
  .post(userValidation, userController.create)

router
  .route('/:id')
  .get(userController.fetchSingle)
  .patch(userController.update)
  .delete(userController.delete)

module.exports = router
