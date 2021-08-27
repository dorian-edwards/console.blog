const { body } = require('express-validator')

const userValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('Please enter your first name.'),
  body('lastName').not().isEmpty().withMessage('Please enter your last name.'),
  body('username').not().isEmpty().withMessage('Please enter a username'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Please enter a password at least 6 characters long'),
  body('confirmPassword')
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        return false
      }
      return true
    })
    .withMessage('Passwords do not match'),
]

module.exports = userValidation
