
const express = require('express')
const { all_user, add_user, user_login } = require('../controllers/user')
const router = express.Router()


router.get('/user', all_user)
router.post('/user', add_user)

// Login
router.post('/user/login', user_login)

module.exports = router   
