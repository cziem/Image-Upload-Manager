const express = require("express")
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('filetype not supported'), false)
  }
}

const upload = multer({
  storage,
  fileFilter
}) 

const fileController = require("../controllers/uploadFiles")
const checkAuth = require("../middlewares/auth")

router.post('/create', checkAuth, upload.single('buildingImage'), fileController.create)

module.exports = router
