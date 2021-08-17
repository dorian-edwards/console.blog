const express = require('express')
const userController = require('../controllers/user.controller')

const router = express.Router()

router.route('/').get(userController.fetchAll).post(userController.create)

router
  .route('/:id')
  .get(userController.fetchById)
  .patch(userController.update)
  .delete(userController.delete)

module.exports = router
