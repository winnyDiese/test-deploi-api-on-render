
const express = require('express')
const { all_user, add_user, one_user, user_login, delete_user, update_user, one_user_by_tel } = require('../controllers/user')
const router = express.Router()


router.get('/user', all_user)
router.post('/user', add_user)
router.delete('/user/:id', delete_user)
router.put('/user/:id', update_user)

router.get('/user/:id', one_user)
router.get('/user/tel/:tel', one_user_by_tel)

// Login
router.post('/user/login', user_login)

module.exports = router   
