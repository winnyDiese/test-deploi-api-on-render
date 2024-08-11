
const express = require('express')
const { all_user_exten, add_user_exten,one_user_exten,delete_user_exten,update_user_exten } = require('../controllers/user-extension')
const router = express.Router()


router.get('/user-exten', all_user_exten)
router.post('/user-exten', add_user_exten)
router.delete('/user-exten/:id', delete_user_exten)
router.put('/user-exten/:id', update_user_exten)

router.get('/user-exten/:id', one_user_exten)

module.exports = router
