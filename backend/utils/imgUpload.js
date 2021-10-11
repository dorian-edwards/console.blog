const multer = require('multer')
const path = require('path')
const catchAsync = require('./catchAsync')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

const fileFilter = (req, file, cb) => {
  const acceptedFiles = ['.avif', '.jpeg', '.jpg', '.png']
  const ext = path.extname(file.originalname)
  if (acceptedFiles.includes(ext)) return cb(null, true)
  cb(null, false)
}

module.exports = (name) =>
  catchAsync(async (req, res, next) => {
    const upload = multer({ storage, fileFilter }).single(name)
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.log('Multer error: ', err)
      } else if (err) {
        console.log('Normal error: ', err)
      }
      next()
    })
  })
