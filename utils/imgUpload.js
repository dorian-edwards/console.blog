// new ish \/
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const catchAsync = require('./catchAsync')
// new ish /\

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

module.exports = (name) =>
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
