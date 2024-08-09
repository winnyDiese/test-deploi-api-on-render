
const express = require('express')
const { all_user, add_user, one_user, user_login, delete_user } = require('../controllers/user')
const router = express.Router()


router.get('/user', all_user)
router.post('/user', add_user)
router.get('/user/:id', one_user)
router.delete('/user/:id', delete_user)

// Login
router.post('/user/login', user_login)

module.exports = router   
