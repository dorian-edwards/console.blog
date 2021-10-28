const express = require('express')
const path = require('path')
// new ish \/
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
// new ish /\
const catchAsync = require('../utils/catchAsync')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const imgUpload = require('../utils/imgUpload')

const router = express.Router()

// new ish \/
const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env
cloudinary.config({
  cloud_name: CLOUDINARY_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    format: async () => 'jpg',
    public_id: (req, file) => `${req.params.id}-${Date.now()}`,
  },
})

const handleImage = (name) =>
  catchAsync(async (req, res, next) => {
    const parser = multer({ storage }).single(name)
    parser(req, res, (err) => {
      if (err) {
        console.log({ err })
      } else {
        next()
      }
    })
  })
// new ish /\

router
  .route('/')
  .get(authController.validate, userController.fetchAll)
  .post(userController.create)

router
  .route('/:id')
  .all(authController.validate)
  .get(userController.fetchSingle)
  .patch(authController.checkUser, handleImage('img'), userController.update)
  .delete(authController.checkUser, userController.delete)

router
  .route('/:id/posts')
  .all(authController.validate)
  .get(userController.fetchByAuthor)

module.exports = router
