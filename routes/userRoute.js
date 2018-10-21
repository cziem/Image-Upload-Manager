const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const checkAuth = require('../middlewares/auth')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/get_all', checkAuth, userController.get_all_users)

module.exports = router