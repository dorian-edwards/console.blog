const { body } = require('express-validator')

exports.userValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('Please enter your first name.'),
  body('lastName').not().isEmpty().withMessage('Please enter your last name.'),
  body('username').not().isEmpty().withMessage('Please enter a username'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Please enter a password at least 6 characters in length'),
  body('confirmPassword')
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        return false
      }
      return true
    })
    .withMessage('Passwords do not match'),
]

exports.checkEmail = async (req) => {
  await body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .run(req)
}

exports.checkPassword = async (req) => {
  await body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Please enter a password at least 6 characters in length')
    .run(req)
  await body('confirmPassword')
    .custom((val) => {
      if (val !== req.body.newPassword) {
        return false
      }
      return true
    })
    .withMessage('Passwords do not match')
    .run(req)
}
