
const express = require('express')
const { all_user, add_user } = require('../controllers/ville')
const router = express.Router()


router.get('/user', all_user)
// router.post('/user', add_user)

module.exports = router   
