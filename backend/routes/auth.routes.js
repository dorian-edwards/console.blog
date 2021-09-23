const express = require('express')
const { userValidation } = require('../validators/userValidation')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', userValidation, authController.signup)
router.post('/login', authController.login)

module.exports = router
